using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesHub.Models;
using MoviesHub.Models.ApiResponse;
using MoviesHub.Models.RequestDto;
using MoviesHub.Services;

namespace MoviesHub.Repositories
{
    public class MovieRepository
    {
        private readonly ContextDb _contextDb;
        public MovieRepository(ContextDb contextDb)
        {
            _contextDb = contextDb;
        }
        public async Task<Movie> AddMovie(CreateMovieDto createMovieDto)
        {

            byte[] imageBytes = null;
            if (createMovieDto.Image != null)
            {
                using (var ms = new MemoryStream())
                {
                    await createMovieDto.Image.CopyToAsync(ms);
                    imageBytes = ms.ToArray();
                }
            }
            var movie = new Movie
            {
                Name = createMovieDto.Name,
                Image = imageBytes,
                Summary = createMovieDto.Summary,
                Format = createMovieDto.Format,
                Tagline = createMovieDto.Tagline,
                IMDbRating = createMovieDto.IMDbRating,
                Runtime = createMovieDto.Runtime,
                OriginalLanguage = createMovieDto.OriginalLanguage,
                Genres = createMovieDto.Genres,
                DownLoadLink = createMovieDto.DownLoadLink,
                Categories = new List<Category>(),
                screenshots = new List<Screenshot>(),
                castCrew = new List<CastCrew>(),
                Audios = new List<Audio>(),
                Qualities = new List<Quality>(),
                Ott = createMovieDto.OTT
            };

            

            // Screenshots
            foreach (var screenshot in createMovieDto.Screenshots)
            {
                using (var ms = new MemoryStream())
                {
                    await screenshot.CopyToAsync(ms);
                    movie.screenshots.Add(new Screenshot
                    {
                        ScImage = ms.ToArray(),
                        ImageType = screenshot.FileName
                    });
                }
            }

            // Cast & Crew
            foreach (var cast in createMovieDto.CastCrewList)
            {
                movie.castCrew.Add(new CastCrew
                {
                    Name = cast.Name,
                    Role = cast.Role
                });
            }

            movie.Categories = await _contextDb.categories
            .Where(c => createMovieDto.CategoryIds.Contains(c.Id)).ToListAsync();

            movie.Audios = await _contextDb.audios
                .Where(a => createMovieDto.AudioIds.Contains(a.Id)).ToListAsync();

            movie.Qualities = await _contextDb.quality
                .Where(q => createMovieDto.QualityIds.Contains(q.Id)).ToListAsync();

            movie.Year=await _contextDb.YearMovies.Where(a => createMovieDto.Year.Contains(a.Id)).ToListAsync();

            // Save to DB
            _contextDb.movie.Add(movie);
            foreach (var entry in _contextDb.ChangeTracker.Entries())
            {
                Console.WriteLine($"Entity: {entry.Entity.GetType().Name}, State: {entry.State}");
            }
            await _contextDb.SaveChangesAsync();

            return movie;

        }

            public async Task<(List<MovieResponseDto> Movies, int TotalCount, List<string> LatestPosters)>
                GetPaginatedMoviesWithCount(int page, int size, string? categoryName = null, int? year = null, string? search = null)
                {

                    if (year == 0)
                    {
                        year = null;
                    }
                    // Base query
                    var query = _contextDb.movie
                        .Include(m => m.Categories)
                        .Include(m => m.Qualities)
                        .Include(m => m.Audios)
                        .Include(m => m.Year)
                        .Include(m => m.castCrew)
                        .Include(m => m.screenshots)
                        .AsQueryable();

                    if (!string.IsNullOrWhiteSpace(search))
                    {
                        query = query.Where(m => m.Name.ToLower().Contains(search.ToLower()));

                    }

            // Apply filters only if provided
            if (!string.IsNullOrEmpty(categoryName))
                    {
                        query = query.Where(m => m.Categories.Any(c => c.Name == categoryName));
                    }

                    if (year.HasValue)
                    {
                        query = query.Where(m => m.Year.Any(y => y.Year == year.Value));
                    }

                    var totalCount = await query.CountAsync();

                    var latestPosters = await _contextDb.movie
                        .Where(m => m.Image != null)
                        .OrderByDescending(m => m.Id)
                        .Select(m => $"data:image/jpeg;base64,{Convert.ToBase64String(m.Image)}")
                        .Take(15)
                        .ToListAsync();

                    var movies = await query
                        .OrderByDescending(m => m.Id)
                        .Skip(page * size)
                        .Take(size)
                        .Select(m => new MovieResponseDto
                        {
                            Id = m.Id,
                            Name = m.Name,
                            Summary = m.Summary,
                            Format = m.Format,
                            Tagline = m.Tagline,
                            IMDbRating = m.IMDbRating,
                            Runtime = m.Runtime,
                            OriginalLanguage = m.OriginalLanguage,
                            Genres = m.Genres,
                            DownLoadLink = m.DownLoadLink,
                            Categories = m.Categories.Select(c => c.Name).ToList(),
                            Qualities = m.Qualities.Select(q => q.QualityName).ToList(),
                            Audios = m.Audios.Select(a => a.Language).ToList(),
                            Years = m.Year.Select(y => y.Year.ToString()).ToList(),
                            PosterImageBase64 = m.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(m.Image)}" : null,
                            ScreenshotBase64s = m.screenshots
                                .Where(s => s.ScImage != null)
                                .Select(s => $"data:image/jpeg;base64,{Convert.ToBase64String(s.ScImage)}")
                                .ToList(),
                            CastCrews = m.castCrew.Select(c => new CastCrewDTO
                            {
                                Name = c.Name,
                                Role = c.Role
                            }).ToList()
                        })
                        .ToListAsync();

                    return (movies, totalCount, latestPosters);
                }


        public async Task<(List<MovieResponseDto> Movies, int TotalCount)> FindMovieById(int Id)
        {
            var totalCount = await _contextDb.movie.CountAsync();

            var movie = await _contextDb.movie
                .Where(m => m.Id == Id)
                .Include(m => m.Categories)
                .Include(m => m.Qualities)
                .Include(m => m.Audios)
                .Include(m => m.Year)
                .Include(m => m.castCrew)
                .Include(m => m.screenshots)
                .Select(m => new MovieResponseDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    Summary = m.Summary,
                    Format = m.Format,
                    Tagline = m.Tagline,
                    IMDbRating = m.IMDbRating,
                    Runtime = m.Runtime,
                    OriginalLanguage = m.OriginalLanguage,
                    Genres = m.Genres,
                    DownLoadLink = m.DownLoadLink,
                    Categories = m.Categories.Select(c => c.Name).ToList(),
                    Qualities = m.Qualities.Select(q => q.QualityName).ToList(),
                    Audios = m.Audios.Select(a => a.Language).ToList(),
                    Years = m.Year.Select(y => y.Year.ToString()).ToList(),
                    PosterImageBase64 = m.Image != null ? $"data:image/jpeg;base64,{Convert.ToBase64String(m.Image)}" : null,
                    ScreenshotBase64s = m.screenshots
                                            .Where(s => s.ScImage != null)
                                            .Select(s => $"data:image/jpeg;base64,{Convert.ToBase64String(s.ScImage)}")
                                            .ToList(),
                    CastCrews = m.castCrew.Select(c => new CastCrewDTO
                    {
                        Name = c.Name,
                        Role = c.Role
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            // Return as list with single item if found, or empty list if not found
            return (movie != null ? new List<MovieResponseDto> { movie } : new List<MovieResponseDto>(), totalCount);
        }

    }
}
