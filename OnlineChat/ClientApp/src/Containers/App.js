import React, { Component } from 'react';
import Wrapper from '../Shared/Wrapper';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Login from '../Components/Login';
import http from 'axios';
import notifierConfig from '../Shared/Notification';
import notifier from "simple-react-notifications";
import Chat from '../Components/Chat';
import ChatHub from '../Components/ChatHub';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            loading: false,
            loggedIn: false
        }
        notifier.configure(notifierConfig);

    }

    userLogin = () => {
        this.setState({ loading: true })
        http.get('/api/Auth', { params: { user: this.state.user, pass: this.state.pass } }).then(response => {
            !response.data && notifier.error('نام کاربری یا رمز عبور اشتباه است');
            this.setState({ loggedIn: response.data, loading: false })
        })
    }

    handleUser = (e) => {
        this.setState({ user: e.target.value })
    }

    handlePass = (e) => {
        this.setState({ pass: e.target.value })
    }

    render() {
        return (
            <Wrapper>
                <ChatHub />
                {/* {!this.state.loggedIn ?
                    <div className="container p-2 text-center">
                        <Login user={this.handleUser}
                            pass={this.handlePass}
                            login={this.userLogin}
                            loading={this.state.loading} />
                    </div>
                    :
                    <Chat/>
                } */}
            </Wrapper>
        )
    }
}