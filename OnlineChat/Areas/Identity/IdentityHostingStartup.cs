using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineChat.Areas.Identity.Data;
using OnlineChat.Models;

[assembly: HostingStartup(typeof(OnlineChat.Areas.Identity.IdentityHostingStartup))]
namespace OnlineChat.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<OnlineChatContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("OnlineChatContextConnection")));

                services.AddDefaultIdentity<OnlineChatUser>()
                    .AddEntityFrameworkStores<OnlineChatContext>();
            });
        }
    }
}