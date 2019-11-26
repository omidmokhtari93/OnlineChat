import React, { Component } from 'react';
import Wrapper from '../Shared/Wrapper';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Login from '../Components/Login';
import http from 'axios';
import notifierConfig from '../Shared/Notification';
import notifier from "simple-react-notifications";
import Chat from '../Components/Chat';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            loading: false,
            loggedIn: false,
            username: ''
        }
        notifier.configure(notifierConfig);

    }

    userLogin = (e) => {
        e.preventDefault();
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

    handleUserName = (e) => {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <Wrapper>
                {!this.state.loggedIn ?
                    <div className="container p-2 text-center">
                        <Login user={this.handleUser}
                            username={this.handleUserName}
                            pass={this.handlePass}
                            login={this.userLogin}
                            loading={this.state.loading} />
                    </div>
                    :
                    <Chat username={this.state.username} />
                }
            </Wrapper>
        )
    }
}