namespace MoviesHub.Models.ApiResponse
{
    public class MovieResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Format { get; set; }
        public string Tagline { get; set; }
        public string IMDbRating { get; set; }
        public string Runtime { get; set; }
        public string OriginalLanguage { get; set; }
        public string Genres { get; set; }
        public string DownLoadLink { get; set; }
        public List<string> Categories { get; set; }
        public List<string> Qualities { get; set; }
        public List<string> Audios { get; set; }
        public List<string> Years { get; set; }
        public List<CastCrewDTO> CastCrews { get; set; }

        public string PosterImageBase64 { get; set; }

        public List<string> ScreenshotBase64s { get; set; }
    }

    public class CastCrewDTO
    {
        public string Name { get; set; }
        public string Role { get; set; }
    }

}


