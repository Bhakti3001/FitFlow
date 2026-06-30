import { useWorkouts } from '../context/WorkoutContext'
import { getExerciseProgress } from '../utils/suggestions'
import { TrendingUp, TrendingDown, Minus, Dumbbell } from 'lucide-react'
import '../styles/Progress.css'

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp size={16} color="#22c55e" />
  if (trend === 'down') return <TrendingDown size={16} color="#ef4444" />
  if (trend === 'same') return <Minus size={16} color="#888" />
  return <Dumbbell size={16} color="#6366f1" />
}

function TrendBadge({ trend, diff }) {
  if (trend === 'new') return <span className="badge new">First time</span>
  if (trend === 'up') return <span className="badge up">+{diff} lbs</span>
  if (trend === 'down') return <span className="badge down">{diff} lbs</span>
  return <span className="badge same">No change</span>
}

function Progress() {
  const { workouts } = useWorkouts()
  const progress = getExerciseProgress(workouts)

  if (workouts.length === 0) {
    return (
      <div>
        <h1 className="page-title">Progress</h1>
        <p className="page-subtitle">Track your strength gains over time</p>
        <div className="empty-state">
          <h2>No data yet</h2>
          <p>Log at least one workout to see your progress</p>
        </div>
      </div>
    )
  }

  const improving = progress.filter(p => p.trend === 'up').length
  const total = progress.length

  return (
    <div>
      <h1 className="page-title">Progress</h1>
      <p className="page-subtitle">
        Tracking {total} exercise{total !== 1 ? 's' : ''} —{' '}
        <span style={{ color: '#22c55e' }}>{improving} improving</span>
      </p>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{workouts.length}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Exercises Tracked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#22c55e' }}>{improving}</div>
          <div className="stat-label">Improving</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#6366f1' }}>
            {progress.filter(p => p.trend === 'new').length}
          </div>
          <div className="stat-label">New This Week</div>
        </div>
      </div>

      {/* Exercise Progress List */}
      <div className="section-label">Exercise Breakdown</div>
      <div className="progress-list">
        {progress.map(p => (
          <div key={p.name} className="progress-item">
            <div className="progress-left">
              <TrendIcon trend={p.trend} />
              <div>
                <div className="progress-name">{p.name}</div>
                <div className="progress-meta">
                  {p.totalSessions} session{p.totalSessions !== 1 ? 's' : ''}
                  {p.previous && ` · Previous: ${p.previous.weight > 0 ? p.previous.weight + ' lbs' : 'Bodyweight'}`}
                </div>
              </div>
            </div>
            <div className="progress-right">
              <div className="progress-weight">
                {p.latest.weight > 0 ? `${p.latest.weight} lbs` : 'Bodyweight'}
              </div>
              <TrendBadge trend={p.trend} diff={p.weightDiff} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progress