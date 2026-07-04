using System.ComponentModel.DataAnnotations;

namespace FitFlowApi.Models
{
    public class Exercise
    {
        [Required(ErrorMessage = "Exercise name is required")]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; } = "";

        [Range(1, 100, ErrorMessage = "Sets must be between 1 and 100")]
        public int Sets { get; set; }

        [Range(1, 1000, ErrorMessage = "Reps must be between 1 and 1000")]
        public int Reps { get; set; }

        [Range(0, 2000, ErrorMessage = "Weight must be between 0 and 2000")]
        public double Weight { get; set; }
    }

    public class Workout
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "Date must be in YYYY-MM-DD format")]
        public string Date { get; set; } = "";

        [Required(ErrorMessage = "Muscle group is required")]
        [StringLength(50, MinimumLength = 1)]
        public string MuscleGroup { get; set; } = "";

        [Required(ErrorMessage = "At least one exercise is required")]
        [MinLength(1, ErrorMessage = "At least one exercise is required")]
        public List<Exercise> Exercises { get; set; } = new();
    }
}