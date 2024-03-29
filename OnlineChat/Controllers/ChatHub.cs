﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace OnlineChat.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        static HashSet<string> CurrentConnections = new HashSet<string>();

        public async Task Send(string message)
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("Receive", new
            {
                message = message,
                datetime = DateTime.Now.ToString("hh:mm")
            });
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.GetHttpContext().Request.Query["username"];
            if (!CurrentConnections.Contains(Context.ConnectionId))
            {
                CurrentConnections.Add(Context.ConnectionId);
            }
            await Clients.All.SendAsync("UserConnected", CurrentConnections);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            var username = Context.GetHttpContext().Request.Query["username"];
            if (CurrentConnections.Contains(Context.ConnectionId))
            {
                CurrentConnections.Remove(Context.ConnectionId);
            }
            await Clients.All.SendAsync("UserDisconnected", CurrentConnections);
            await base.OnDisconnectedAsync(ex);
        }
    }
}