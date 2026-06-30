import { useWorkouts } from '../context/WorkoutContext'
import { Trash2, Dumbbell } from 'lucide-react'
import '../styles/History.css'
import '../styles/LogWorkout.css'

function formatDate(dateStr) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', options)
}

function History() {
  const { workouts, deleteWorkout } = useWorkouts()

  if (workouts.length === 0) {
    return (
      <div>
        <h1 className="page-title">Workout History</h1>
        <p className="page-subtitle">See all your past workouts and progress</p>
        <div className="empty-state">
          <h2>No workouts yet</h2>
          <p>Log your first workout to see it here</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Workout History</h1>
      <p className="page-subtitle">
        {workouts.length} workout{workouts.length !== 1 ? 's' : ''} logged
      </p>

      <div className="history-list">
        {workouts.map(workout => (
          <div key={workout.id} className="workout-card">
            {/* Card Header */}
            <div className="workout-card-header">
              <div className="workout-card-left">
                <span className="muscle-badge">{workout.muscleGroup}</span>
                <span className="workout-date">{formatDate(workout.date)}</span>
              </div>
              <div className="workout-card-actions">
                <button
                  className="icon-btn danger"
                  onClick={() => deleteWorkout(workout.id)}
                  title="Delete workout"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Exercise Table */}
            <table className="exercise-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises.map((ex, i) => (
                  <tr key={i}>
                    <td className="exercise-name">
                      <Dumbbell size={13} style={{ marginRight: 6, color: '#6366f1' }} />
                      {ex.name}
                    </td>
                    <td>{ex.sets}</td>
                    <td>{ex.reps}</td>
                    <td>{ex.weight > 0 ? `${ex.weight} lbs` : 'Bodyweight'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History