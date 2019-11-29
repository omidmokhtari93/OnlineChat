import React, { Component } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import notifierConfig from '../Shared/Notification';
import http from 'axios';
import notifier from "simple-react-notifications";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
        }
        notifier.configure(notifierConfig);
    }

    login = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const form = new FormData;
        form.append('Email', this.state.username)
        form.append('Password', this.state.password)
        http.post('/api/Login', form).then(response => {
            if (response.data.isSuccess) {
                this.setState({ loading: false })
                this.props.history.push('/chat')
            } else {
                notifier.error('نام کاربری یا رمز عبور اشتباه است')
            }
        })
    }

    handleUser = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePass = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div className="card sans d-inline-block text-right" >
                <div className="card-header text-center">ورود</div>
                <form onSubmit={this.login} className="card-body d-inline-block">
                    <input className="form-control mb-2 rtl" placeholder="نام کاربری..." onChange={this.handleUser} />
                    <input className="form-control mb-2 rtl" placeholder="رمز عبور..." onChange={this.handlePass} type="password" />
                    <button className="btn btn-primary float-left" type="submit">
                        {this.state.loading && (
                            <div className="spinner-border loading-sm align-middle mr-1 mt-1" role="status">
                                <span className="sr-only"></span>
                            </div>
                        )}
                        ورود
                        </button>
                    <Link to="/register" className="float-right mt-2">ثبت نام</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
