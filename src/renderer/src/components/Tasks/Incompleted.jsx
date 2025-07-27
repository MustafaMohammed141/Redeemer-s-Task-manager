import { ArrowDown, ArrowUp, Trash2, X } from 'lucide-react'
import React from 'react'

const Incompleted = ({ completeTask, delTask, upTask, downTask, tasks, buttonStyle }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        if (!task.completed) {
          return (
            <li key={task?.id} className="m-3 p-3 transition-all ">
              <div className="flex items-center">
                <button
                  className={` bg-red-500 hover:bg-red-600 hover:cursor-pointer active:bg-red-800  ${buttonStyle}`}
                  onClick={() => {
                    completeTask(index)
                  }}
                >
                  {!task?.completed === true ? <X /> : ''}
                </button>
                <div className=" flex-1">
                  <p className=" px-2.5 text-2xl">{task?.text || ''}</p>
                  <p className=" px-2.5 text-[12px]">Created at: {task?.created || ''}</p>
                </div>

                <button
                  className={` bg-red-500 hover:bg-red-600 hover:cursor-pointer active:bg-red-800  ${buttonStyle}`}
                  onClick={() => {
                    delTask(index)
                  }}
                >
                  <Trash2 />
                </button>
                <button
                  className={` bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer active:bg-cyan-800  ${buttonStyle}`}
                  onClick={() => {
                    upTask(index)
                  }}
                >
                  <ArrowUp />
                </button>
                <button
                  className={` bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer active:bg-indigo-800 ${buttonStyle}`}
                  onClick={() => {
                    downTask(index)
                  }}
                >
                  <ArrowDown />
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
