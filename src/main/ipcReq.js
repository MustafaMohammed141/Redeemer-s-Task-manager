import { ipcMain, BrowserWindow } from 'electron'
import { taskDB } from './tasksHander'
export const ipcReq = () => {
  ipcMain.on('close-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (current) current.close()
  })
  ipcMain.on('GoFull-window', () => {
    const current = BrowserWindow.getFocusedWindow()
    if (!current.isMaximized()) {
      current.maximize()
    } else {
      current.unmaximize()
    }
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
    try {
      const newTask = taskDB.addTask({ text: taskText, completed: false })
      return newTask
    } catch (e) {
      console.log(e)
    }
  })

  ipcMain.handle('update-task', async (event, id, updates) => {
    try {
      const updatedTask = taskDB.updateTask(id, updates)
      return updatedTask
    } catch (e) {
      console.log(e)
    }
  })

  ipcMain.handle('delete-task', async (event, id) => {
    return taskDB.deleteTask(id)
  })

  ipcMain.handle('reorder-tasks', async (event, tasks) => {
    return taskDB.writeTasks(tasks)
  })
  ipcMain.handle('Completed', () => {
    return console.log('pong')
  })
}
