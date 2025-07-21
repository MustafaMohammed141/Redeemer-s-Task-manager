import { app } from 'electron'
import { join } from 'path'
import fs from 'fs'

class TaskDatabase {
  constructor() {
    this.dbPath = join(app.getPath('userData'), 'tasks.tsk')
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
      created: new Date().toLocaleString(),
      done: ''
    }
    data.tasks.push(newTask)
    this.writeTasks(data.tasks)
    return newTask
  }

  updateTask(id, updates) {
    const data = this.readTasks()
    const taskIndex = data.tasks.findIndex((task) => task.id === id)
    if (taskIndex !== -1) {
      data.tasks[taskIndex] = {
        ...data.tasks[taskIndex],
        ...updates
      }
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

export const taskDB = new TaskDatabase()
