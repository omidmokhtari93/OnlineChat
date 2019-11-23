using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace OnlineChat.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("/api/Auth")]
        public bool Auth(string user , string pass)
        {
            return user == "user" && pass == "123321";
        }
    }
}
