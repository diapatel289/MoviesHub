namespace MoviesHub.Models
{
    public class Quality
    {
        public int Id { get; set; }
        public string QualityName { get; set; }

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }

    }

}
