using Microsoft.AspNetCore.Mvc;
using MoviesHub.Models.RequestDto;
using MoviesHub.Repositories;

namespace MoviesHub.Controllers
{
    
   
        [ApiController]
        [Route("api")]
        public class MovieDataController : ControllerBase
        {

             private readonly MovieRepository movierepository;

                
             private readonly CatAndYearRepository catAndYearRepository;

            public MovieDataController(CatAndYearRepository movieRepository,MovieRepository movie)
            {
                catAndYearRepository = movieRepository;
                movierepository = movie;
            }

            [HttpGet("filters")]
            public async Task<IActionResult> GetMovieFilters()
            {
                var (categories, years) = await catAndYearRepository.GetMovieFiltersAsync();

                return Ok(new
                {
                    categories,
                    years
                });
            }

            [HttpPost("addmovie")]
            public async Task<IActionResult> AddMovie([FromForm] CreateMovieDto dto)
        {
            

            // 2. Save using repository
            var addedMovie = await movierepository.AddMovie(dto);

            // 3. Return HTTP response
            return Ok(new { message = "Movie added successfully", movieId = addedMovie.Id });
        }

            [HttpGet("paginated")]
            public async Task<IActionResult> GetPaginatedMovies([FromQuery] int page = 0, [FromQuery] int size = 10)
            {
            var (movies, totalCount) = await movierepository.GetPaginatedMoviesWithCount(page, size);
            return Ok(new { totalCount, movies });
        }
        }
    
}
