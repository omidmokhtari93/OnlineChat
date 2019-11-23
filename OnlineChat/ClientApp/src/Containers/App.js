import React, { Component } from 'react';
import Wrapper from '../Shared/Wrapper';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Login from '../Components/Login';
import http from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            loggedIn: false
        }
    }

    userLogin = () => {
        http.get('/api/Auth', { params: { user: this.state.user, pass: this.state.pass } }).then(response => {
            this.setState({loggedIn: response.data})
        })
    }

    handleUser = (e) => {
        this.setState({ user: e.target.value })
    }

    handlePass = (e) => {
        this.setState({ pass: e.target.value })
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className="container p-2 text-center">
                    <Login user={this.handleUser} pass={this.handlePass} login={this.userLogin} />
                </div>
            );
        } else {
            return null
        }
    }
}