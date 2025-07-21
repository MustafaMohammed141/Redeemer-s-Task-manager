import { useState, useEffect } from 'react'
import Completed from './Tasks/completed'
import Incompleted from './Tasks/incompleted'
const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [tab, setTab] = useState(false)
  const [newTasks, setNewTasks] = useState('')

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
    const updt = { ...task, completed: !task.completed }
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
        <div className="flex justify-center gap-2 w-full select-none">
          <button
            className={tab ? 'hover:cursor-pointer rounded-md' : 'cursor-auto text-gray-400'}
            onClick={() => {
              if (tab) return handleTab()
            }}
          >
            on going
          </button>
          /
          <button
            className={!tab ? 'hover:cursor-pointer rounded-md' : 'cursor-auto text-gray-400'}
            onClick={() => {
              if (!tab) return handleTab()
            }}
          >
            completed
          </button>
        </div>
        <ol className="list-decimal ml-15 text-4xl font-bold max-w-3xl ">
          {tab ? (
            <Completed
              tasks={tasks}
              completeTask={completeTask}
              delTask={delTask}
              upTask={upTask}
              downTask={downTask}
            />
          ) : (
            <Incompleted
              tasks={tasks}
              completeTask={completeTask}
              delTask={delTask}
              upTask={upTask}
              downTask={downTask}
            />
          )}
        </ol>
      </div>
    </div>
  )
}

export default ToDoList
