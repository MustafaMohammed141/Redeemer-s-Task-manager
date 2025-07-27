import React from 'react'
import { ArrowDown, ArrowUp, Check, Trash2 } from 'lucide-react'

const Completed = ({ completeTask, delTask, upTask, downTask, tasks, buttonStyle }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        console.log(task)

        if (task.completed) {
          return (
            <li key={task?.id} className=" m-3 p-3 transition-all ">
              <div className="flex  items-center">
                <button
                  className={` bg-green-500 hover:bg-green-600 hover:cursor-pointer active:bg-green-800 ${buttonStyle}`}
                  onClick={() => {
                    completeTask(index)
                  }}
                >
                  {task?.completed === true ? <Check /> : ''}
                </button>
                <div className=" flex-1">
                  <p className=" px-2.5 text-2xl  text-gray-400 line-through ">
                    {task?.text || ''}
                  </p>
                  <p className=" px-2.5 text-[12px] text-gray-400">Done at: {task?.done || ''}</p>
                </div>
                <button
                  className={` bg-red-500 hover:bg-red-600 hover:cursor-pointer active:bg-red-800 ${buttonStyle}`}
                  onClick={() => {
                    delTask(index)
                  }}
                >
                  <Trash2 />
                </button>
                <button
                  className={` bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer active:bg-cyan-800 ${buttonStyle}`}
                  onClick={() => {
                    upTask(index)
                  }}
                >
                  <ArrowUp />
                </button>
                <button
                  className={`bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer active:bg-indigo-800 ${buttonStyle}`}
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

export default Completed
