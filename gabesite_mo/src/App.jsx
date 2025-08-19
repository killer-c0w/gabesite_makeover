import { Routes, Route } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import Projects from './Projects.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  )
}

export default App
