import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico'
import fs from 'fs'

class TaskDatabase {
  constructor() {
    this.dbPath = path.join(app.getPath('userData'), 'tasks.tsk')
    this.initDatabase()
  }

  initDatabase() {
    if (!fs.existsSync(this.dbPath)) {
      const initialData = {
        version: '1.0',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        tasks: []
      }
      fs.writeFileSync(this.dbPath, JSON.stringify(initialData, null, 2))
    }
  }

  readTasks() {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading tasks:', error)
      return { tasks: [] }
    }
  }

  writeTasks(tasks) {
    try {
      const data = this.readTasks()
      data.tasks = tasks
      data.modified = new Date().toISOString()
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2))
      return { success: true }
    } catch (error) {
      console.error('Error writing tasks:', error)
      return { success: false, error }
    }
  }

  addTask(task) {
    const data = this.readTasks()
    const newTask = {
      id: Date.now(),
      ...task,
      created: new Date().toISOString()
    }
    data.tasks.push(newTask)
    this.writeTasks(data.tasks)
    return newTask
  }

  updateTask(id, updates) {
    const data = this.readTasks()
    const taskIndex = data.tasks.findIndex((task) => task.id === id)
    if (taskIndex !== -1) {
      data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updates }
      this.writeTasks(data.tasks)
      return data.tasks[taskIndex]
    }
    return null
  }

  deleteTask(id) {
    const data = this.readTasks()
    const filteredTasks = data.tasks.filter((task) => task.id !== id)
    this.writeTasks(filteredTasks)
    return { success: true }
  }
}

const taskDB = new TaskDatabase()
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 768,
    minHeight: 232,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../../build/icon.ico'),
    ...(process.platform === 'win' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('close-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (current) current.close()
  })
  ipcMain.on('GoFull-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (current) current.setFullScreen(true)
  })
  ipcMain.on('ExFull-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (current) current.setFullScreen(false)
  })
  ipcMain.on('minimize-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (current) current.minimize()
  })
  ipcMain.handle('get-all-tasks', async () => {
    const data = taskDB.readTasks()
    return data.tasks
  })

  ipcMain.handle('add-task', async (event, taskText) => {
    const newTask = taskDB.addTask({ text: taskText, completed: false })
    return newTask
  })

  ipcMain.handle('update-task', async (event, id, updates) => {
    const updatedTask = taskDB.updateTask(id, updates)
    return updatedTask
  })

  ipcMain.handle('delete-task', async (event, id) => {
    return taskDB.deleteTask(id)
  })

  ipcMain.handle('reorder-tasks', async (event, tasks) => {
    return taskDB.writeTasks(tasks)
  })
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
