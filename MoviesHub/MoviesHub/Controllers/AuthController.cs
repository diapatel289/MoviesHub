using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using MoviesHub.Models.ApiResponse;
using MoviesHub.Models.RequestDto;
using MoviesHub.Repositories;

namespace MoviesHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository userRepository;
        private readonly IConfiguration _configuration;

        public AuthController(UserRepository userrepository,IConfiguration configuration) {
            userRepository = userrepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await userRepository.IsUserExistsAsync(dto.Email))
            {
                return BadRequest(new ApiResponse
                {
                    Success = false,
                    Message = "Email already exists."
                });
            }

            await userRepository.RegisterUserAsync(dto);
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "User registered successfully."
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var (token, user) = await userRepository.LoginAsync(loginDto);

            if (token == null)
                return Unauthorized(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                });

            return Ok(new 
            {
                Success = true,
                Message="Login Successfully",
                token,
                role=user.Role
            });
        }

    }
}
