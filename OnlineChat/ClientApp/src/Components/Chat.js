import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr/dist/browser/signalr';
import ReceiverBadge from './ReceiverBadge';
import SenderBadge from './SenderBadge';
import http from 'axios';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 0,
            signalRConnection: null,
            connectionStatus: false,
            message: '',
            messages: [],
            userNames: [],
            sendLoading: false
        }
    }

    componentDidMount = () => {
        const username = this.props.username === '' ? 'guest' : this.props.username;
        this.setState({
            signalRConnection: new signalR.HubConnectionBuilder()
                .withUrl("/chatHub?username=" + username, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                }).build(),
            windowHeight: document.body.scrollHeight - 50
        })
        setTimeout(() => {
            this.state.signalRConnection.start().then(() => {
                this.setState({ connectionStatus: true })
                this.state.signalRConnection.on('UserConnected', (userInfo) => {
                    this.setState({ userNames: userInfo.currentUsers })
                })
                this.state.signalRConnection.on('UserDisconnected', (userInfo) => {
                    this.setState({ userNames: userInfo.currentUsers })
                })
            }).catch((e) => {
                this.setState({ connectionStatus: false })
            });
            this.state.signalRConnection.on('Receive', (message) => {
                this.setState({
                    messages: [...this.state.messages, {
                        message: message.message,
                        datetime: message.datetime,
                        receiver: false
                    }]
                })
                this.scrollBottom();
            });

            window.addEventListener('resize', this.handleResize);
        }, 1000);

    }

    handleResize = (e) => {
        this.setState({ windowHeight: document.body.scrollHeight - 50 })
    }

    sendMessage = (e) => {
        this.setState({ sendLoading: true })
        e.preventDefault();
        this.getDateTimeForSender().then(response => {
            this.state.signalRConnection.invoke('Send', this.state.message).then((e) => {
                this.setState({
                    messages: [...this.state.messages, {
                        message: this.state.message,
                        datetime: response,
                        receiver: true
                    }]
                })
                this.scrollBottom();
            }).catch(er => console.log(er))
        }).catch(err => {
            console.log('unhandled error')
        });
    }

    getDateTimeForSender = () => {
        return http.get('/api/GetDateTime').then((response) => { return response.data })
    }

    scrollBottom = () => {
        var list = document.getElementById("chatBadges");
        list.scrollTop = list.offsetHeight * 1000;
        this.setState({ message: '', sendLoading: false })
    }

    handleMessage = (e) => {
        this.setState({ message: e.target.value })
    }

    render() {
        return (
            <div className="container p-2 rtl text-center sans">
                <div className="card card-body p-1 d-inline-block w-50 w-100 text-right">
                    <div className="mb-1">
                        افراد آنلاین:
                        {this.state.userNames.map((name, index) => <span className="badge badge-primary mx-1 sans" key={index}>{name}</span>)}
                        {this.state.connectionStatus
                            ? <span className="float-left text-success">آنلاین</span>
                            : <div className="float-left text-primary">
                                <span className="spinner-border loading-xsm font-weight-light align-middle ml-1" role="status">
                                    <span className="sr-only"></span>
                                </span>
                                در حال اتصال ...
                            </div>
                        }
                    </div>
                    <div className="card chat-area" style={{ height: this.state.windowHeight }}>
                        <div className="chat-badges" id="chatBadges">
                            {this.state.messages.map((message, index) => {
                                return message.receiver ? <ReceiverBadge key={index} message={message.message} datetime={message.datetime} />
                                    : <SenderBadge key={index} message={message.message} datetime={message.datetime} />
                            })}
                        </div>

                        {this.state.sendLoading && <div className="spinner-border loading-sm send-loading" role="status">
                            <span className="sr-only"></span>
                        </div>}

                        <div className="bottom-controls">
                            <form onSubmit={this.sendMessage}>
                                <input placeholder="پیام ..." onChange={this.handleMessage} value={this.state.message} />
                                <button type="submit" className="fa fa-send-o text-primary"></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}