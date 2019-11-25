using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace OnlineChat.Hubs
{
    public class ChatHub : Hub
    {
        static HashSet<string> CurrentConnections = new HashSet<string>();
        static HashSet<string> CurrentUsernames = new HashSet<string>();

        public async Task Send(string message)
        {
            await Clients.All.SendAsync("Receive", message);
        }

        public async Task UserNames(string username)
        {
            if (!CurrentUsernames.Contains(username))
            {
                CurrentUsernames.Add(username);
            }
            await Clients.All.SendAsync("UserNames", CurrentUsernames);
        }

        public override async Task OnConnectedAsync()
        {
            if (!CurrentConnections.Contains(Context.ConnectionId))
            {
                CurrentConnections.Add(Context.ConnectionId);
            }
            await Clients.All.SendAsync("UserConnected", CurrentConnections);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            if (CurrentConnections.Contains(Context.ConnectionId))
            {
                CurrentConnections.Remove(Context.ConnectionId);
            }
            await Clients.All.SendAsync("UserDisconnected", CurrentConnections);
            await base.OnDisconnectedAsync(ex);
        }
    }
}