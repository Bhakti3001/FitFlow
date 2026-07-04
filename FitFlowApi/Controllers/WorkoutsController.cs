using Microsoft.AspNetCore.Mvc;
using FitFlowApi.Models;

namespace FitFlowApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutsController : ControllerBase
    {
        // In-memory storage
        private static List<Workout> _workouts = new List<Workout>
        {
            new Workout
            {
                Id = 1,
                Date = "2025-06-28",
                MuscleGroup = "Chest",
                Exercises = new List<Exercise>
                {
                    new Exercise { Name = "Bench Press", Sets = 4, Reps = 8, Weight = 135 },
                    new Exercise { Name = "Incline Dumbbell Press", Sets = 3, Reps = 10, Weight = 50 }
                }
            },
            new Workout
            {
                Id = 2,
                Date = "2025-06-27",
                MuscleGroup = "Back",
                Exercises = new List<Exercise>
                {
                    new Exercise { Name = "Pull Ups", Sets = 4, Reps = 8, Weight = 0 },
                    new Exercise { Name = "Barbell Row", Sets = 3, Reps = 10, Weight = 115 }
                }
            },
            new Workout
            {
                Id = 3,
                Date = "2025-06-26",
                MuscleGroup = "Legs",
                Exercises = new List<Exercise>
                {
                    new Exercise { Name = "Squat", Sets = 4, Reps = 6, Weight = 185 },
                    new Exercise { Name = "Leg Press", Sets = 3, Reps = 12, Weight = 270 }
                }
            }
        };

        private static int _nextId = 4;

        // GET api/workouts
        [HttpGet]
        public ActionResult<List<Workout>> GetAll()
        {
            return Ok(_workouts.OrderByDescending(w => w.Date).ToList());
        }

        // POST api/workouts
        [HttpPost]
        public ActionResult<Workout> Create([FromBody] Workout workout)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            workout.Id = _nextId++;
            _workouts.Add(workout);
            return CreatedAtAction(nameof(GetAll), new { id = workout.Id }, workout);
        }

        // DELETE api/workouts/1
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var workout = _workouts.FirstOrDefault(w => w.Id == id);
            if (workout == null) return NotFound();
            _workouts.Remove(workout);
            return NoContent();
        }
    }
}