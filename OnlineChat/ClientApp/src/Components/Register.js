import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import notifierConfig from '../Shared/Notification';
import notifier from "simple-react-notifications";
import http from 'axios';
import Wrapper from '../Shared/Wrapper'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            loggedIn: false,
            errors: []
        }
        notifier.configure(notifierConfig);
    }

    handleUser = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePass = (e) => {
        this.setState({ password: e.target.value })
    }

    register = (e) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            notifier.error('لطفا فیلدهای خالی را تکمیل نمایید')
            return;
        }
        this.setState({ loading: true })
        const form = new FormData;
        form.append('Email', this.state.username)
        form.append('Password', this.state.password)
        http.post('/api/Login/Register', form).then(response => {
            this.setState({ errors: [] })
            response.data.isSuccess && response.data.errors.map(er => {
                this.setState({ errors: [...this.state.errors, er.description], loading: false })
            })
            response.data.isSuccess && notifier.success('حساب کاربری با موفقیت ایجاد شد')
            this.setState({ username: '', password: '' })
        })
    }

    render() {
        return (
            <Wrapper>
                <div className="card sans d-inline-block">
                    <div className="card-header" >ثبت نام</div>
                    <form className="card-body text-right  d-inline-block" onSubmit={this.register}>
                        <input className="form-control mb-2 rtl" placeholder="نام کاربری..."
                            onChange={this.handleUser} value={this.state.username}
                        />
                        <input className="form-control mb-2 rtl" placeholder="رمز عبور..." type="password"
                            onChange={this.handlePass} value={this.state.password}
                        />
                        <button className="btn btn-primary float-left" type="submit">
                            {this.state.loading && (
                                <div className="spinner-border loading-sm align-middle mr-1 mt-1" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            )}
                            ثبت نام
                        </button>
                        <a className="float-right cursor text-primary mt-2" onClick={this.props.history.goBack}>بازگشت</a>
                    </form>
                </div>
                {this.state.errors !== undefined && this.state.errors.map((er, index) => {
                    return <p className="sans mt-1 mb-0 text-danger" key={index}>{er}</p>
                })}
            </Wrapper>
        )
    }
}

export default withRouter(Register);