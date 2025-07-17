import { Square, X, Minus } from 'lucide-react'
import { useState } from 'react'

const TopBar = () => {
  const [full, setFull] = useState(false)

  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  const handleFullScreen = () => {
    if (!full) {
      window.electron.ipcRenderer.send('GoFull-window')
    } else {
      window.electron.ipcRenderer.send('ExFull-window')
    }
    setFull(!full)
  }
  const handleMin = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }

  return (
    <div
      className="bg-blue-900 text-blue-100 w-screen h-fit fixed"
      style={{ webkitAppRegion: 'drag' }}
    >
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
  )
}

export default TopBar
