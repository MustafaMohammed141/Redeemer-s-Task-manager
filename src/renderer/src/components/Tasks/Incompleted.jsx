import React from 'react'

const Incompleted = ({ completeTask, delTask, upTask, downTask, tasks }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        if (!task.completed) {
          return (
            <li key={task?.id} className="m-3 p-3 transition-all ">
              <div className="flex ">
                <span className=" px-2.5 text-2xl flex-1">{task?.text || ''}</span>
                <button
                  className="border-[2px] font-semibold text-lg rounded-md p-1 bg-green-500 hover:bg-green-600 hover:cursor-pointer active:bg-green-800 mr-3 w-10 h-10"
                  onClick={() => {
                    completeTask(index)
                  }}
                >
                  {task?.completed === true ? <Check /> : ''}
                </button>
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
        }
      })}
    </div>
  )
}

export default Incompleted
