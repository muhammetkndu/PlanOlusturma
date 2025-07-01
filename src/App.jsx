import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './complements/navbar'
import Home from './pages/home'
import Todos from './complements/toDos'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toDos" element={<Todos/>} />
      </Routes>
    </Router>
  )
}

export default App