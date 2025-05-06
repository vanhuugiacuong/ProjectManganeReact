import './App.css'
import AddProject from './components/AddProject'
import ProjectList from './components/ProjectList'
import { ProjectsProvider } from './context/ProjectsProvider'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ProjectsProvider>
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Quản lý Dự án & Nhiệm vụ</h1>
          <AddProject />
          <ProjectList />
        </div>
      </ProjectsProvider>
    </div>
  );  
}

export default App
