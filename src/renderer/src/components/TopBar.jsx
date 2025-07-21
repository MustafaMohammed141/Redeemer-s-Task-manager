import { Square, X, Minus } from 'lucide-react'
import icon from '../assets/img/icon.png'
const TopBar = () => {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  const handleFullScreen = () => {
    window.electron.ipcRenderer.send('GoFull-window')
  }

  const handleMin = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div
      className="bg-blue-900 text-blue-100 w-screen h-fit fixed flex justify-between"
      style={{ webkitAppRegion: 'drag' }}
    >
      <div className="p-1.5 flex gap-2.5">
        <img src={icon} className="h-6 " />
        <p className="font-semibold">Redeemer's To do list</p>
      </div>
      <div>
        <div className="flex flex-row-reverse p-0.5 gap-1   ">
          <button
            onClick={handleClose}
            className=" hover:bg-red-500 active:bg-red-700 p-1 flex justify-center items-center w-8 rounded-md"
            style={{ webkitAppRegion: 'no-drag' }}
          >
            <X size={'24px'} />
          </button>
          <button
            onClick={handleFullScreen}
            className=" hover:bg-[rgb(56,85,170)] active:bg-[rgba(56,84,170,0.44)] p-1 flex justify-center items-center w-8 rounded-md"
            style={{ webkitAppRegion: 'no-drag' }}
          >
            <Square size={'18px'} />
          </button>
          <button
            onClick={handleMin}
            className=" hover:bg-[rgb(56,85,170)] active:bg-[rgba(56,85,170,0.44)] p-1 flex justify-center items-center w-8 rounded-md"
            style={{ webkitAppRegion: 'no-drag' }}
          >
            <Minus size={'24px'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
