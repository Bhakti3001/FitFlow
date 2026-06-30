// How many days to rest each muscle group
const RECOVERY_DAYS = {
  Chest: 2,
  Back: 2,
  Legs: 3,
  Shoulders: 2,
  Arms: 1,
  Core: 1,
  Cardio: 1,
}

// All muscle groups
const ALL_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio']

// Get how many days ago a date was
function daysAgo(dateStr) {
  const today = new Date()
  const date = new Date(dateStr + 'T00:00:00')
  const diff = today - date
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// Get the last time each muscle group was trained
function getLastTrainedMap(workouts) {
  const map = {}
  workouts.forEach(w => {
    const days = daysAgo(w.date)
    if (!(w.muscleGroup in map) || days < map[w.muscleGroup]) {
      map[w.muscleGroup] = days
    }
  })
  return map
}

// Main suggestion function
export function getSuggestions(workouts) {
  if (workouts.length === 0) {
    return {
      recommended: ALL_GROUPS,
      reasoning: 'No workout history yet — any muscle group is a great start!',
      status: [],
    }
  }

  const lastTrained = getLastTrainedMap(workouts)

  // Build status for every muscle group
  const status = ALL_GROUPS.map(group => {
    const days = lastTrained[group]
    const recovery = RECOVERY_DAYS[group]

    if (days === undefined) {
      return { group, status: 'never', daysAgo: null, recovered: true }
    }

    const recovered = days >= recovery
    return {
      group,
      status: recovered ? 'ready' : 'resting',
      daysAgo: days,
      recovered,
    }
  })

  // Recommend groups that are fully recovered
  const recommended = status
    .filter(s => s.recovered)
    .map(s => s.group)

  // Build reasoning text
  const resting = status.filter(s => !s.recovered).map(s => s.group)
  const reasoning = resting.length > 0
    ? `${resting.join(', ')} ${resting.length === 1 ? 'is' : 'are'} still recovering. Focus on the green ones!`
    : 'All muscle groups are recovered — pick whatever you feel like today!'

  return { recommended, reasoning, status }
}

// Get your most trained muscle group
export function getFavoriteMuscle(workouts) {
  if (workouts.length === 0) return null
  const count = {}
  workouts.forEach(w => {
    count[w.muscleGroup] = (count[w.muscleGroup] || 0) + 1
  })
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]
}

// Get total volume (sets x reps x weight) for a muscle group
export function getTotalVolume(workouts, muscleGroup) {
  return workouts
    .filter(w => w.muscleGroup === muscleGroup)
    .flatMap(w => w.exercises)
    .reduce((total, ex) => total + (ex.sets * ex.reps * ex.weight), 0)
}