namespace MoviesHub.Models
{
    public class DownloadLink
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string Url { get; set; }
        public string Label { get; set; } // e.g., "480p", "HQ"

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }
    }

}
