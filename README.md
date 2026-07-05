# FitFlow

A smart workout planner and tracker — built for the Root16 Round 3 technical interview.

Log workouts, view history, get recovery/plateau-based training suggestions, and track progress per exercise.

## Screenshots

<!-- Add screenshots here, e.g.: -->
<!-- ![Log Workout](screenshots/log-workout.png) -->
<!-- ![History](screenshots/history.png) -->
<!-- ![Suggestions](screenshots/suggestions.png) -->
<!-- ![Progress](screenshots/progress.png) -->

## Tech Stack

- **Frontend:** React (Vite), React Router, React Context
- **Backend:** C# ASP.NET Core Web API
- **Storage:** In-memory (resets on API restart, seeded with 3 sample workouts)

## Features

- **Log Workout** — record date, muscle group, and a dynamic list of exercises (sets/reps/weight)
- **History** — view past workouts as cards, delete entries
- **Suggestions** — recommends which muscle groups are recovered and ready to train, based on per-muscle-group recovery windows; flags exercises that have plateaued (no weight increase across the last 3 sessions)
- **Progress** — per-exercise trend (up/down/new) comparing latest vs. previous session, plus summary stats

## Getting Started

**Requirements:** Node.js, .NET 8 SDK

**Terminal 1 — API:**
```bash
cd FitFlowApi
dotnet run
# http://localhost:5098
```

**Terminal 2 — Frontend:**
```bash
npm install
npm run dev
# http://localhost:5173
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/workouts` | Returns all workouts, ordered by date descending |
| POST | `/api/workouts` | Creates a new workout (validated — see below) |
| DELETE | `/api/workouts/{id}` | Deletes a workout by id |

## Validation

- **Server-side:** data annotations on `Workout`/`Exercise` models (required fields, date format, sets/reps/weight ranges, at least one exercise); invalid requests return `400` with details
- **Client-side:** form blocks save and lists specific errors if date, muscle group, or any exercise field is missing/invalid; number inputs constrained to valid ranges

## Project Structure

```
FitFlow/
├── FitFlowApi/                    C# ASP.NET Core API
│   ├── Controllers/WorkoutsController.cs
│   ├── Models/Workout.cs
│   └── Program.cs                 CORS (localhost:5173), MapControllers
└── src/
    ├── components/ExerciseRow.jsx
    ├── context/WorkoutContext.jsx  Global state; fetches from API on mount
    ├── pages/
    │   ├── LogWorkout.jsx
    │   ├── History.jsx
    │   ├── Suggestions.jsx
    │   └── Progress.jsx
    ├── routes/AppRoutes.jsx
    └── utils/
        ├── api.js                 fetchWorkouts, createWorkout, deleteWorkout
        └── suggestions.js         getSuggestions, getFavoriteMuscle, getPlateaus, getExerciseProgress
```

## Design Decisions & Tradeoffs

- **In-memory storage** — scoped to the interview timebox; a production version would use SQL Server + EF Core
- **React Context over prop drilling** — workout state is needed across every page
- **No authentication** — out of scope for a single-user demo; would add auth for multi-user use
- **What I'd improve with more time:** persistent database, user accounts, charts for progress over time, ML-based training suggestions
