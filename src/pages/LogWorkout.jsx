import { useState } from 'react'
import { Plus, Save } from 'lucide-react'
import { useWorkouts } from '../context/WorkoutContext'
import ExerciseRow from '../components/ExerciseRow'
import '../styles/LogWorkout.css'

const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio']

const emptyExercise = () => ({ name: '', sets: '', reps: '', weight: '' })

function LogWorkout() {
  const { addWorkout } = useWorkouts()

  const [muscleGroup, setMuscleGroup] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [exercises, setExercises] = useState([emptyExercise()])
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState([])

  // Validate the form; returns an array of error strings (empty = valid)
  function validate() {
    const errs = []

    if (!date) errs.push('Date is required.')
    if (!muscleGroup) errs.push('Muscle group is required.')

    const filled = exercises.filter(ex => ex.name.trim() !== '')
    if (filled.length === 0) {
      errs.push('At least one exercise is required.')
    } else {
      filled.forEach((ex, i) => {
        const sets = Number(ex.sets)
        const reps = Number(ex.reps)
        const weight = Number(ex.weight)

        if (!ex.sets || sets <= 0 || !Number.isInteger(sets)) {
          errs.push(`Exercise ${i + 1} (${ex.name}): sets must be a whole number greater than 0.`)
        }
        if (!ex.reps || reps <= 0 || !Number.isInteger(reps)) {
          errs.push(`Exercise ${i + 1} (${ex.name}): reps must be a whole number greater than 0.`)
        }
        if (ex.weight === '' || isNaN(weight) || weight < 0) {
          errs.push(`Exercise ${i + 1} (${ex.name}): weight must be 0 or greater.`)
        }
      })
    }

    return errs
  }

  // Update a specific field in a specific exercise row
  function handleExerciseChange(index, field, value) {
    setExercises(prev =>
      prev.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    )
  }

  // Add a new empty exercise row
  function handleAddExercise() {
    setExercises(prev => [...prev, emptyExercise()])
  }

  // Remove an exercise row
  function handleRemoveExercise(index) {
    setExercises(prev => prev.filter((_, i) => i !== index))
  }

  // Save the workout
  function handleSave() {
    const validationErrors = validate()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setSaved(false)
      return
    }

    setErrors([])
    addWorkout({
      date,
      muscleGroup,
      exercises: exercises.filter(ex => ex.name !== ''),
    })

    // Reset form
    setMuscleGroup('')
    setDate(new Date().toISOString().split('T')[0])
    setExercises([emptyExercise()])
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="page-title">Log Workout</h1>
      <p className="page-subtitle">Track your exercises, sets, reps and weight</p>

      <div className="card">
        {/* Date and Muscle Group */}
        <div className="form-row">
          <div className="form-group">
            <label className="label">Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Muscle Group</label>
            <select
              className="input"
              value={muscleGroup}
              onChange={e => setMuscleGroup(e.target.value)}
            >
              <option value="">Select muscle group</option>
              {MUSCLE_GROUPS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Exercise Headers */}
        <div className="exercise-header">
          <span>Exercise</span>
          <span>Sets</span>
          <span>Reps</span>
          <span>Weight (lbs)</span>
          <span></span>
        </div>

        {/* Exercise Rows */}
        {exercises.map((ex, i) => (
          <ExerciseRow
            key={i}
            index={i}
            exercise={ex}
            onChange={handleExerciseChange}
            onRemove={handleRemoveExercise}
          />
        ))}

        {/* Add Exercise Button */}
        <button className="btn secondary" onClick={handleAddExercise}>
          <Plus size={16} />
          Add Exercise
        </button>

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="error-list" style={{ marginTop: 12, marginBottom: 4 }}>
            {errors.map((err, i) => (
              <p key={i} style={{ color: '#ef4444', fontSize: 13, margin: '4px 0' }}>{err}</p>
            ))}
          </div>
        )}

        {/* Save Button */}
        <div className="form-actions">
          {saved && <span className="success-msg">✓ Workout saved!</span>}
          <button className="btn primary" onClick={handleSave}>
            <Save size={16} />
            Save Workout
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogWorkout