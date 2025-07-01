import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './complements/navbar'
import Home from './pages/home'
import Todos from './complements/toDos'
import Done from './pages/done'
import { TaskProvider } from './taskProvider'
import Statistic from './pages/Statistic'
function App() {
  return (
  <TaskProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toDos" element={<Todos/>} />
        <Route path="/done" element= {<Done />} />
        <Route path="/Statistic" element= {<Statistic />} />
      </Routes>
    </Router>
  </TaskProvider>
  )
}

export default App