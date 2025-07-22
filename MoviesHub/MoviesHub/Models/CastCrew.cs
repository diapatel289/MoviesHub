namespace MoviesHub.Models
{
    public class CastCrew
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; } // e.g., Writer, Director

        //many to one relationship
        public Movie Movie { get; set; }
    }

}
