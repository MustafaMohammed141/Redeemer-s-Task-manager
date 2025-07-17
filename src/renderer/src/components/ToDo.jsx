import { useState, useEffect } from 'react'

const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [newTasks, setNewTasks] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const allTasks = await window.electron.ipcRenderer.invoke('get-all-tasks')
    setTasks(allTasks)
  }

  const handleInput = (e) => {
    setNewTasks(e.target.value)
  }

  const addTask = async () => {
    if (newTasks.trim() !== '') {
      const newTask = await window.electron.ipcRenderer.invoke('add-task', newTasks)
      setTasks((t) => [...t, newTask])
      setNewTasks('')
    }
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
            className="border-[2px] rounded-md p-1 bg-green-500 hover:bg-green-600 hover:cursor-pointer active:bg-green-800"
            onClick={addTask}
          >
            Add task
          </button>
        </div>
        <ol className="list-decimal ml-15 text-4xl font-bold max-w-3xl ">
          {tasks.map((task, index) => {
            return (
              <li key={task.id} className="border-1 m-3 p-3 border-[hsla(0,0%,50%,1)]">
                <div className="flex ">
                  <span className="font-semibold px-2.5 text-2xl flex-1 ">{task.text || task}</span>
                  <button
                    className="border-[2px] font-semibold text-lg rounded-md p-1 bg-red-500 hover:bg-red-600 hover:cursor-pointer active:bg-red-800 mr-3"
                    onClick={() => {
                      delTask(index)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="border-[2px] font-semibold text-lg rounded-md p-1 bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer active:bg-cyan-800 mr-3"
                    onClick={() => {
                      upTask(index)
                    }}
                  >
                    Move Up
                  </button>
                  <button
                    className="border-[2px] font-semibold text-lg rounded-md p-1 bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer active:bg-indigo-800 mr-3"
                    onClick={() => {
                      downTask(index)
                    }}
                  >
                    Move Down
                  </button>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default ToDoList
