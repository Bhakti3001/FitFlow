import { Trash2 } from 'lucide-react'

function ExerciseRow({ exercise, index, onChange, onRemove }) {
  return (
    <div className="exercise-row">
      <input
        className="input"
        placeholder="Exercise name"
        value={exercise.name}
        onChange={e => onChange(index, 'name', e.target.value)}
      />
      <input
        className="input small"
        placeholder="Sets"
        type="number"
        value={exercise.sets}
        onChange={e => onChange(index, 'sets', e.target.value)}
      />
      <input
        className="input small"
        placeholder="Reps"
        type="number"
        value={exercise.reps}
        onChange={e => onChange(index, 'reps', e.target.value)}
      />
      <input
        className="input small"
        placeholder="Weight (lbs)"
        type="number"
        value={exercise.weight}
        onChange={e => onChange(index, 'weight', e.target.value)}
      />
      <button className="icon-btn danger" onClick={() => onRemove(index)}>
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default ExerciseRow