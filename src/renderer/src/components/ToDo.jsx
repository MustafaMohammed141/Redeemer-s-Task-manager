import { useState, useEffect } from 'react'
import Completed from './Tasks/Completed'
import Incompleted from './Tasks/incompleted'
const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [tab, setTab] = useState(false)
  const [newTasks, setNewTasks] = useState('')

  const buttonStyle =
    'border-[2px] font-semibold text-lg rounded-md p-1 mr-3 w-10 h-10 flex items-center justify-center border-white'

  const loadTasks = async () => {
    const allTasks = await window.electron.ipcRenderer.invoke('get-all-tasks')
    setTasks(allTasks)
  }

  const handleInput = (e) => {
    setNewTasks(e.target.value)
  }
  const handleTab = () => {
    setTab(!tab)
  }
  const addTask = async () => {
    if (newTasks.trim() !== '') {
      const newTask = await window.electron.ipcRenderer.invoke('add-task', newTasks)
      setTasks((t) => [...t, newTask])
      setNewTasks('')
    }
  }
  const completeTask = async (index) => {
    const task = tasks[index]
    const updt = { ...task, completed: !task.completed, done: new Date().toLocaleString() }
    await window.electron.ipcRenderer.invoke('update-task', task.id, updt)

    const updtArr = tasks.map((t, i) => {
      return i === index ? updt : t
    })
    setTasks(updtArr)
  }
  const delTask = async (index) => {
    const taskToDelete = tasks[index]
    await window.electron.ipcRenderer.invoke('delete-task', taskToDelete.id)
    const updt = tasks.filter((_, i) => i !== index)
    setTasks(updt)
  }

  const upTask = async (index) => {
    if (index > 0) {
      const updt = [...tasks]
      ;[updt[index], updt[index - 1]] = [updt[index - 1], updt[index]]
      setTasks(updt)
      await window.electron.ipcRenderer.invoke('reorder-tasks', updt)
    }
  }

  const downTask = async (index) => {
    if (index < tasks.length - 1) {
      const updt = [...tasks]
      ;[updt[index], updt[index + 1]] = [updt[index + 1], updt[index]]
      setTasks(updt)
      await window.electron.ipcRenderer.invoke('reorder-tasks', updt)
    }
  }
  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="justify-center flex pt-10 text-blue-100 ">
      <div>
        <h1 className="font-bold text-5xl px-2.5 text-center">My to do list</h1>
        <div className="flex justify-center m-10 gap-3">
          <input
            type="text"
            value={newTasks}
            placeholder="Enter a new task"
            className=" border-[1px] border-[hsla(0,0%,80%,1)] w-xl text-blue-100  p-2"
            onChange={handleInput}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="border-[2px] hover:cursor-pointer rounded-md p-1 bg-green-500 hover:bg-green-600  active:bg-green-800"
            onClick={addTask}
          >
            Add task
          </button>
        </div>
        <div className="flex justify-center items-center w-full select-none">
          <div className=" text-2xl border-2 border-black flex gap-9 p-3 bg-gray-800 rounded-4xl">
            <button
              className={
                tab
                  ? 'hover:cursor-pointer rounded-4xl p-2 transition-all transform-[]'
                  : 'cursor-auto bg-white rounded-4xl p-2 text-black transition-all'
              }
              onClick={() => {
                if (tab) return handleTab()
              }}
            >
              on going
            </button>
            <button
              className={
                !tab
                  ? 'hover:cursor-pointer rounded-4xl p-2 transition-all'
                  : 'cursor-auto bg-white rounded-4xl p-2 text-black transition-all'
              }
              onClick={() => {
                if (!tab) return handleTab()
              }}
            >
              completed
            </button>
          </div>
        </div>
        <ul className=" ml-15 text-4xl font-bold max-w-3xl transition-all">
          {tab ? (
            <Completed
              tasks={tasks}
              completeTask={completeTask}
              delTask={delTask}
              upTask={upTask}
              downTask={downTask}
              buttonStyle={buttonStyle}
            />
          ) : (
            <Incompleted
              tasks={tasks}
              completeTask={completeTask}
              delTask={delTask}
              upTask={upTask}
              downTask={downTask}
              buttonStyle={buttonStyle}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default ToDoList
