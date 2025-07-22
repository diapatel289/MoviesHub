using MoviesHub.Models.RequestDto;
using MoviesHub.Models;
using Microsoft.EntityFrameworkCore;
using MoviesHub.Services;

namespace MoviesHub.Repositories
{
    public class AddItemRepository
    {
        private readonly ContextDb _context;

        public AddItemRepository(ContextDb context)
        {
            _context = context;
        }

        public async Task<(bool Success, string Message)> AddCategoryAsync(AddItemDto dto)
        {
            bool exists = await _context.categories.AnyAsync(c => c.Name.ToLower() == dto.Name.ToLower());
            if (exists)
                return (false, "Category already exists.");

            _context.categories.Add(new Category { Name = dto.Name });
            await _context.SaveChangesAsync();
            return (true, "Category added successfully.");
        }

        public async Task<(bool Success, string Message)> AddAudioAsync(AddItemDto dto)
        {
            bool exists = await _context.audios.AnyAsync(a => a.Language.ToLower() == dto.Name.ToLower());
            if (exists)
                return (false, "Audio language already exists.");

            _context.audios.Add(new Audio { Language = dto.Name });
            await _context.SaveChangesAsync();
            return (true, "Audio added successfully.");
        }

        public async Task<(bool Success, string Message)> AddYearAsync(AddYear dto)
        {
            bool exists = await _context.YearMovies.AnyAsync(y => y.Year == dto.Year);
            if (exists)
                return (false, "Year already exists.");

            _context.YearMovies.Add(new YearMovie { Year = dto.Year });
            await _context.SaveChangesAsync();
            return (true, "Year added successfully.");
        }

        public async Task<(bool Success, string Message)> AddQualityAsync(AddItemDto dto)
        {
            bool exists = await _context.quality.AnyAsync(q => q.QualityName.ToLower() == dto.Name.ToLower());
            if (exists)
                return (false, "Quality already exists.");

            _context.quality.Add(new Quality { QualityName = dto.Name });
            await _context.SaveChangesAsync();
            return (true, "Quality added successfully.");
        }
    }
}
