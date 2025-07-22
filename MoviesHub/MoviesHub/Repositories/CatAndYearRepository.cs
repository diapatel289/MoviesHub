using Microsoft.EntityFrameworkCore;
using MoviesHub.Models;
using MoviesHub.Services;

namespace MoviesHub.Repositories
{
    public class CatAndYearRepository
    {
        private readonly ContextDb _context;

        public CatAndYearRepository(ContextDb context)
        {
            _context = context;
        }

        public async Task<(List<string> Categories, List<int> Years)> GetMovieFiltersAsync()
        {
            var categories = await _context.categories
                .Select(c => c.Name)
                .Distinct()
                .ToListAsync();

            var years = await _context.YearMovies
                .Select(y => y.Year)
                .Distinct()
                .ToListAsync();

            return (categories, years);
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _context.categories.ToListAsync();
        }

        public async Task<IEnumerable<Quality>> GetQualitiesAsync()
        {
            return await _context.quality.ToListAsync();
        }

        public async Task<IEnumerable<Audio>> GetAudiosAsync()
        {
            return await _context.audios.ToListAsync();
        }

        public async Task<IEnumerable<YearMovie>> GetYearsAsync()
        {
            return await _context.YearMovies.OrderByDescending(y => y.Year).ToListAsync();
        }
    }
}
