namespace MoviesHub.Models
{
    public class Screenshot
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string ImageType { get; set; }
        
        public byte[] ScImage { get; set; }

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }
    }

}
