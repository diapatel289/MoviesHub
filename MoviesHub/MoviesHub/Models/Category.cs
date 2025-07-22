namespace MoviesHub.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //many to one relationship
        public ICollection<Movie> Movies { get; set; }

    }

}
