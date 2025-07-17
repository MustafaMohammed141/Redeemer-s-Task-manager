import ToDoList from './components/ToDo'
import TopBar from './components/TopBar'

function App() {
  return (
    <div className=" bg-gray-900 h-screen w-screen overflow-x-hidden flex flex-col">
      <TopBar />
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-9">
        <ToDoList />
      </div>
    </div>
  )
}

export default App
