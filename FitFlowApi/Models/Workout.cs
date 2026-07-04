namespace FitFlowApi.Models
{
    public class Exercise
    {
        public string Name { get; set; } = "";
        public int Sets { get; set; }
        public int Reps { get; set; }
        public double Weight { get; set; }
    }

    public class Workout
    {
        public int Id { get; set; }
        public string Date { get; set; } = "";
        public string MuscleGroup { get; set; } = "";
        public List<Exercise> Exercises { get; set; } = new();
    }
}