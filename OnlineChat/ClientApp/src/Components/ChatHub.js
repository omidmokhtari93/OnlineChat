import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr/dist/browser/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

class ChatHub extends Component {

    componentDidMount = () => {
        let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        }).build();

        connection.start().then(() => {
            connection.invoke('Send', 'hello').catch(err => console.error(err.toString()));
        });

        connection.on('Send', message => {
            console.log('is send', message)
        })

        connection.on('Receive', (message) => {
            console.log('is receive', message)
        })
    }

    render() {
        return (123)
    }
}

export default ChatHub;