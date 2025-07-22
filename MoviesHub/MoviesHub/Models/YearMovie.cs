namespace MoviesHub.Models
{
    public class YearMovie
    {
        public int Id { get; set; }
        public int Year { get; set; }

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }
    }
}
