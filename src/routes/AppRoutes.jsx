import { Routes, Route } from 'react-router-dom'
import LogWorkout from '../pages/LogWorkout'
import History from '../pages/History'
import Suggestions from '../pages/Suggestions'
import Progress from '../pages/Progress'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogWorkout />} />
      <Route path="/history" element={<History />} />
      <Route path="/suggest" element={<Suggestions />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  )
}

export default AppRoutes