import { Routes, Route } from 'react-router-dom'
import LogWorkout from '../pages/LogWorkout'
import History from '../pages/History'
import Suggestions from '../pages/Suggestions'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogWorkout />} />
      <Route path="/history" element={<History />} />
      <Route path="/suggest" element={<Suggestions />} />
    </Routes>
  )
}

export default AppRoutes