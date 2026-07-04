const BASE_URL = 'http://localhost:5098/api'

export async function fetchWorkouts() {
  const res = await fetch(`${BASE_URL}/workouts`)
  if (!res.ok) throw new Error('Failed to fetch workouts')
  return res.json()
}

export async function createWorkout(workout) {
  const res = await fetch(`${BASE_URL}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout),
  })
  if (!res.ok) throw new Error('Failed to create workout')
  return res.json()
}

export async function deleteWorkout(id) {
  const res = await fetch(`${BASE_URL}/workouts/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete workout')
}