import { useWorkouts } from '../context/WorkoutContext'
import { getSuggestions, getFavoriteMuscle, getPlateaus } from '../utils/suggestions'
import { Lightbulb, Trophy, Flame, AlertTriangle } from 'lucide-react'
import '../styles/Suggestions.css'

function Suggestions() {
  const { workouts } = useWorkouts()
  const { recommended, reasoning, status } = getSuggestions(workouts)
  const favorite = getFavoriteMuscle(workouts)
  const plateaus = getPlateaus(workouts)

  return (
    <div>
      <h1 className="page-title">Smart Suggestions</h1>
      <p className="page-subtitle">Based on your workout history and recovery time</p>

      {/* Top Cards */}
      <div className="suggestions-grid">
        <div className="suggestion-card highlight">
          <h3><Lightbulb size={12} style={{ marginRight: 4 }} />Train Today</h3>
          {recommended.length > 0 ? (
            <>
              <div className="big-text">{recommended[0]}</div>
              <p style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
                {recommended.length > 1 && `Also ready: ${recommended.slice(1).join(', ')}`}
              </p>
            </>
          ) : (
            <p>All muscles are still recovering — rest day! 💤</p>
          )}
        </div>

        <div className="suggestion-card">
          <h3><Trophy size={12} style={{ marginRight: 4 }} />Most Trained</h3>
          <div className="big-text">{favorite || '—'}</div>
          <p style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
            {favorite ? 'Your most frequent muscle group' : 'Log workouts to see your favorite'}
          </p>
        </div>

        <div className="suggestion-card" style={{ gridColumn: 'span 2' }}>
          <h3><Flame size={12} style={{ marginRight: 4 }} />Recovery Insight</h3>
          <p>{reasoning}</p>
        </div>

        {plateaus.length > 0 && (
          <div className="suggestion-card" style={{ gridColumn: 'span 2' }}>
            <h3><AlertTriangle size={12} style={{ marginRight: 4 }} />Plateau Watch</h3>
            <p>
              {plateaus.map(p => p.name).join(', ')}{' '}
              {plateaus.length === 1 ? "hasn't" : "haven't"} increased in weight over the last 3 sessions.
              Try adding reps, a set, or a small weight bump next time.
            </p>
          </div>
        )}
      </div>

      {/* Muscle Status List */}
      <div className="section-label">Recovery Status</div>
      <div className="muscle-status-list">
        {status.map(s => (
          <div key={s.group} className="muscle-status-item">
            <div className="muscle-status-left">
              <div className={`status-dot ${s.status}`} />
              <span className="muscle-name">{s.group}</span>
            </div>
            <div className="muscle-status-right">
              <span className="days-ago">
                {s.daysAgo === null
                  ? 'Never trained'
                  : s.daysAgo === 0
                  ? 'Trained today'
                  : `${s.daysAgo}d ago`}
              </span>
              <span className={`status-label ${s.status}`}>
                {s.status === 'never' ? 'Not trained' : s.status === 'ready' ? 'Ready' : 'Resting'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestions