using Microsoft.AspNetCore.Mvc;
using MoviesHub.Models.RequestDto;
using MoviesHub.Repositories;

namespace MoviesHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetaDataController : ControllerBase
    {
        private readonly AddItemRepository _repo;
        private readonly CatAndYearRepository catAndYearRepository;

        public MetaDataController(AddItemRepository repo,CatAndYearRepository catAndYear)
        {
            _repo = repo;
            catAndYearRepository = catAndYear;
        }

        [HttpPost("add-category")]
        public async Task<IActionResult> AddCategory([FromBody] AddItemDto dto)
        {
            var result = await _repo.AddCategoryAsync(dto);
            return Ok(new { success = result.Success, message = result.Message });
        }

        [HttpPost("add-audio")]
        public async Task<IActionResult> AddAudio([FromBody] AddItemDto dto)
        {
            var result = await _repo.AddAudioAsync(dto);
            return Ok(new { success = result.Success, message = result.Message });
        }

        [HttpPost("add-year")]
        public async Task<IActionResult> AddYear([FromBody] AddYear dto)
        {
            var result = await _repo.AddYearAsync(dto);
            return Ok(new { success = result.Success, message = result.Message });
        }

        [HttpPost("add-quality")]
        public async Task<IActionResult> AddQuality([FromBody] AddItemDto dto)
        {
            var result = await _repo.AddQualityAsync(dto);
            return Ok(new { success = result.Success, message = result.Message });
        }

        [HttpGet("get-drop")]
        public async Task<IActionResult> GetDropdownData()
        {
            var categories = await catAndYearRepository.GetCategoriesAsync();
            var years = await catAndYearRepository.GetYearsAsync();
            var audios = await catAndYearRepository.GetAudiosAsync();
            var qualities = await catAndYearRepository.GetQualitiesAsync();

            return Ok(new
            {
                categories = categories.Select(c => new { c.Id, c.Name }),
                years = years.Select(y => new { y.Id, y.Year }),
                audios = audios.Select(a => new { a.Id, a.Language }),
                qualities = qualities.Select(q => new { q.Id, q.QualityName })
            });
        }
    }
}
