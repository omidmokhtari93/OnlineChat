import React, { Component } from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Chat from '../Components/Chat'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container p-2 text-center">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Router exact path="/register">
                            <Register history={this.props.history} />
                        </Router>
                        <Router exact path="/chat">
                            <Chat />
                        </Router>
                    </Switch>
                </Router>
            </div>
        )
    }
}
