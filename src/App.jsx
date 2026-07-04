import { BrowserRouter, NavLink } from 'react-router-dom'
import { Dumbbell, BarChart2, Lightbulb, ClipboardList, TrendingUp } from 'lucide-react'
import { useWorkouts } from './context/WorkoutContext'
import AppRoutes from './routes/AppRoutes'
import './styles/App.css'
function App() {
  const { loading, error } = useWorkouts()

  return (
    <BrowserRouter>
      <div className="app">
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
            <NavLink to="/progress" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <TrendingUp size={20} />
              Progress
            </NavLink>
          </nav>
        </aside>

        <main className="main">
          {loading && <p style={{ color: '#888' }}>Loading...</p>}
          {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
          {!loading && !error && <AppRoutes />}
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App