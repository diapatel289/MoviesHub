namespace MoviesHub.Models
{
    public class Audio
    {
        public int Id { get; set; }
        public string Language { get; set; }

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }
    }

}
