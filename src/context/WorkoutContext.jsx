import { createContext, useContext, useState, useEffect } from 'react'
import { fetchWorkouts, createWorkout, deleteWorkout as apiDelete } from '../utils/api'

const WorkoutContext = createContext()

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load workouts from API on startup
  useEffect(() => {
    fetchWorkouts()
      .then(data => {
        setWorkouts(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Add a new workout via API
  async function addWorkout(workout) {
    const newWorkout = await createWorkout(workout)
    setWorkouts(prev => [newWorkout, ...prev])
  }

  // Delete a workout via API
  async function deleteWorkout(id) {
    await apiDelete(id)
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout, loading, error }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkouts() {
  return useContext(WorkoutContext)
}