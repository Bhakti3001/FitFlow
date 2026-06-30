import { createContext, useContext, useState } from 'react'

// Create the context
const WorkoutContext = createContext()

// Sample data so the app isn't empty on first load
const initialWorkouts = [
  {
    id: 1,
    date: '2025-06-28',
    muscleGroup: 'Chest',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, weight: 135 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 50 },
    ],
  },
  {
    id: 2,
    date: '2025-06-27',
    muscleGroup: 'Back',
    exercises: [
      { name: 'Pull Ups', sets: 4, reps: 8, weight: 0 },
      { name: 'Barbell Row', sets: 3, reps: 10, weight: 115 },
    ],
  },
  {
    id: 3,
    date: '2025-06-26',
    muscleGroup: 'Legs',
    exercises: [
      { name: 'Squat', sets: 4, reps: 6, weight: 185 },
      { name: 'Leg Press', sets: 3, reps: 12, weight: 270 },
    ],
  },
]

// Provider wraps the whole app and shares the data
export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  // Add a new workout
  function addWorkout(workout) {
    const newWorkout = {
      ...workout,
      id: Date.now(),
    }
    setWorkouts(prev => [newWorkout, ...prev])
  }

  // Delete a workout
  function deleteWorkout(id) {
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}

// Custom hook so pages can easily access the context
export function useWorkouts() {
  return useContext(WorkoutContext)
}