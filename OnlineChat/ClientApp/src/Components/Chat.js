import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr/dist/browser/signalr';
import ReceiverBadge from './ReceiverBadge';
import SenderBadge from './SenderBadge';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 0,
            signalRConnection: null,
            connectionStatus: false,
            onlineUsers: []
        }
    }

    componentDidMount = () => {
        this.setState({
            signalRConnection: new signalR.HubConnectionBuilder().withUrl("/chatHub", {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }).build(), 
            windowHeight: document.body.scrollHeight - 50
        })
        setTimeout(() => {
            this.state.signalRConnection.start().then((e) => {
                this.state.signalRConnection.on('UserConnected',function(connectionId){
                    if (this.state.onlineUsers === undefined) {
                        this.setState({ onlineUsers: [...this.state.onlineUsers, connectionId] })
                        console.log(connectionId)
                    }
                })
                this.state.signalRConnection.on('UserDisconnected',function(connectionId){
                    this.setState({ onlineUsers: this.state.onlineUsers.splice(connectionId, 1) })
                })
                this.setState({ connectionStatus: true })
            }).catch((e) => {
                this.setState({ connectionStatus: false })
            })
        }, 1000);
    }

    sendMessage = () => {
        this.state.signalRConnection.invoke('Send', 'hello').then((e) => {
            console.log(e)
        }).catch(err => {
            console.log(err)
        });

        this.state.signalRConnection.on('Receive', (message) => {
            console.log('message received : ', message)
        })
    }
    render() {
        return (
            <div className="container p-2 rtl text-center sans">
                <div className="card card-body p-1 d-inline-block w-50 w-100 text-right">
                    <div className="mb-1">
                        تعداد افراد آنلاین: {this.state.onlineUsers.length}
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
                    <div className="card chat-area" style={{height: this.state.windowHeight}}>
                        <div className="chat-badges">
                            <ReceiverBadge message="سلام؟" datetime="4:00 PM" />
                            <SenderBadge message="سلام عزیزم چطوری خوبی چه خبرا؟" datetime="4:00 PM" />
                            <ReceiverBadge message="سلام عزیزم چطوری خوبی چه خبرا؟" datetime="4:00 PM" />
                            <ReceiverBadge message=" سلام عزیزم چطوری خوبی چه خبرا؟ کجا هستی چیکار میکنی کی میای کی
                             میری مجا هستی بیا زود باش بع دیگه چیز خنک وخه بای بدو" datetime="4:00 PM" />
                            <SenderBadge message="سسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسیییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییی" datetime="4:00 PM" />
                            <ReceiverBadge message="سسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسیییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییی" datetime="4:00 PM" />
                            <SenderBadge message="سلام؟" datetime="4:00 PM" />
                            <ReceiverBadge message=" سلام عزیزم چطوری خوبی چه خبرا؟ کجا هستی چیکار میکنی کی میای کی
                             میری مجا هستی بیا زود باش بع دیگه چیز خنک وخه بای بدو" datetime="4:00 PM" />
                            <ReceiverBadge message="سلام عزیزم چطوری خوبی چه خبرا؟" datetime="4:00 PM" />
                            <SenderBadge message="سلام؟" datetime="4:00 PM" />
                            <SenderBadge message="سلام؟" datetime="4:00 PM" />
                            <ReceiverBadge message=" سلام عزیزم چطوری خوبی چه خبرا؟ کجا هستی چیکار میکنی کی میای کی
                             میری مجا هستی بیا زود باش بع دیگه چیز خنک وخه بای بدو" datetime="4:00 PM" />
                            <ReceiverBadge message="سلام عزیزم چطوری خوبی چه خبرا؟" datetime="4:00 PM" />
                            <SenderBadge message="سلام؟" datetime="4:00 PM" />
                        </div>
                        <div className="bottom-controls">
                            <input placeholder="پیام ..." />
                            <button className="fa fa-send-o text-primary" onClick={this.sendMessage}></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}