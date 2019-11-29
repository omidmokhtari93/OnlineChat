using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using OnlineChat.Areas.Identity.Data;
using OnlineChat.Hubs;

namespace OnlineChat.Controllers
{
    [Route("api/[controller]")]
    public class Login : Controller
    {
        private readonly SignInManager<OnlineChatUser> _signInManager;
        private readonly ILogger<Login> _logger;
        private readonly UserManager<OnlineChatUser> _userManager;

        public Login(SignInManager<OnlineChatUser> signInManager, ILogger<Login> logger, UserManager<OnlineChatUser> userManager)
        {
            _signInManager = signInManager;
            _logger = logger;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task Get(string user, string pass)
        {
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            _logger.LogInformation("User logged in.");
            return new ObjectResult(new LoginResponse
            {
                IsSuccess = result.Succeeded
            });
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromForm] RegisterRequest request)
        {
            var user = new OnlineChatUser { UserName = request.Email, Email = request.Email };
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");
                await _signInManager.SignInAsync(user, isPersistent: false);
            }

            return new ObjectResult(new LoginResponse
            {
                IsSuccess = result.Succeeded,
                Errors = result.Errors
            });
        }

        [HttpGet("/api/GetDateTime")]
        public string GetDateTime()
        {
            return DateTime.Now.ToString("hh:mm");
        }
    }

    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponse
    {
        public bool IsSuccess { get; set; }
        public object Errors { get; set; }
    }
}
