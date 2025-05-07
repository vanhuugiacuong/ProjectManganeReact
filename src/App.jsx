import './App.css'
import AddProject from './components/AddProject'
import ProjectList from './components/ProjectList'
import { ProjectsProvider } from './context/ProjectsProvider'
import { Provider } from './components/ui/provider'
import { useState } from 'react'

function App() {
  const [isEditingTask, setIsEditingTask] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProjectsProvider> 
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Quản lý Dự án & Nhiệm vụ</h1>
          <AddProject className=" "/>
          <ProjectList setIsEditingTask={setIsEditingTask} />
        </div>
      </ProjectsProvider>
    </div>
  );
}

export default App
