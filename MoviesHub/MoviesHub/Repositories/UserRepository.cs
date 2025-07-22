using Microsoft.EntityFrameworkCore;
using MoviesHub.Models.RequestDto;
using MoviesHub.Models;
using MoviesHub.Services;
using System.Text;

namespace MoviesHub.Repositories
{
    public class UserRepository
    {

        private readonly ContextDb contextDb;
        private readonly IConfiguration _config;

        public UserRepository(ContextDb contextdb, IConfiguration config)
        {
            contextDb = contextdb;
            _config = config;
        }


        //To find existing User
        public async Task<bool> IsUserExistsAsync(string email)
        {
            return await contextDb.users.AnyAsync(u => u.Email == email);
        }

        //Register new user in database
        public async Task RegisterUserAsync(RegisterDto dto)
        {
            var user = new User
            {
                FullName = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role="User"
            };

            contextDb.users.Add(user);
            await contextDb.SaveChangesAsync();
        }

        //password hash method
      


        //login logic
        public async Task<(string token, User user)> LoginAsync(LoginDto loginDto)
        {
            var user = await contextDb.users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return (null, null);

            var token = JwtHelper.GenerateToken(user?.Email,user?.Role, _config["JwtKey"]);

            return (token, user);
        }
    }
}
