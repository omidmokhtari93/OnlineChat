using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OnlineChat.Hubs;

namespace OnlineChat.Controllers
{
    [Route("api/[controller]")]
    public class Login : Controller
    {
        [HttpGet("/api/Auth")]
        public bool Auth(string user , string pass)
        {
            return user == "user" && pass == "123321";
        }
    }
}
