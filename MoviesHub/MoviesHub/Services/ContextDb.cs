using Microsoft.EntityFrameworkCore;
using MoviesHub.Models;

namespace MoviesHub.Services
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options): base(options) { }

        public DbSet<Audio> audios { get; set; }
        public DbSet<CastCrew> castCrew { get; set; }
        public DbSet<Movie> movie { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<DownloadLink> downloadLinks { get; set; }
        public DbSet<Quality> quality { get; set; }
        public DbSet<Screenshot> screenshots { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<YearMovie> YearMovies { get; set; }

    }
}
