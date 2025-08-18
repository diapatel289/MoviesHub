namespace MoviesHub.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; }
        public List<YearMovie> Year { get; set; }
        public string Summary { get; set; }
        public string Format { get; set; }
        public string Tagline { get; set; }
        public string IMDbRating { get; set; }
        public string Runtime { get; set; }
        public string OriginalLanguage { get; set; }
        public string Genres {  get; set; }
        public string DownLoadLink { get; set; }
        public string Ott { get; set; }



        public ICollection<Category> Categories { get; set; }
        public ICollection<Quality> Qualities { get; set; }
        public ICollection<Audio> Audios { get; set; }
        public ICollection<CastCrew> castCrew { get; set; }
        public ICollection<Screenshot> screenshots { get; set; }
       
    }
}
