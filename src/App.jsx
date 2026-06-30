import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Dumbbell, BarChart2, Lightbulb, ClipboardList } from 'lucide-react'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <Dumbbell size={28} color="#6366f1" />
            <span>FitFlow</span>
          </div>

          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <ClipboardList size={20} />
              Log Workout
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <BarChart2 size={20} />
              History
            </NavLink>
            <NavLink to="/suggest" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Lightbulb size={20} />
              Suggestions
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main">
          <Routes>
            <Route path="/" element={<h1 className="page-title">Log Workout</h1>} />
            <Route path="/history" element={<h1 className="page-title">History</h1>} />
            <Route path="/suggest" element={<h1 className="page-title">Suggestions</h1>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App