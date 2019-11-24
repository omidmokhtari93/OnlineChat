using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace OnlineChat.Hubs
{
    public class ChatHub : Hub
    {
        [HubMethodName("Send")]
        public async Task Send(string message)
        {
            await Clients.All.SendAsync("Receive", message);
        }
    }
}