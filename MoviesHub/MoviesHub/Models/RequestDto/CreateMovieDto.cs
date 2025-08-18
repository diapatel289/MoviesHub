using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace MoviesHub.Models.RequestDto
{
    public class CreateMovieDto
    {
        public string Name {  get; set; }
        public IFormFile Image {  get; set; }
        
        public string Summary {  get; set; }
        public string Format { get; set; }
        public string Tagline { get; set; }
        public string IMDbRating { get; set; }
        public string Runtime { get; set; }
        public string OriginalLanguage { get; set; }
        public string Genres { get; set; }
        public string DownLoadLink { get; set; }
        public string OTT {  get; set; }

        public List<int> Year { get; set; }
        public List<int> CategoryIds { get; set; }
        public List<int> QualityIds { get; set; }
        public List<int> AudioIds { get; set; }

        public string CastCrews { get; set; }

        [NotMapped]
        public List<CastCrewDto> CastCrewList
        {
            get
            {
                try
                {
                    return string.IsNullOrWhiteSpace(CastCrews)
                        ? new List<CastCrewDto>()
                        : JsonConvert.DeserializeObject<List<CastCrewDto>>(CastCrews);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Deserialization error: " + ex.Message);
                    return new List<CastCrewDto>();
                }
            }
        }
        public List<IFormFile> Screenshots { get; set; }
    }

    public class CastCrewDto
    {
        public string Name { get; set; }
        public string Role { get; set; }
    }

    public class ScreenshotDto
    {
        public string ImageType { get; set; }
        public string UrlPath { get; set; }
    }
}
