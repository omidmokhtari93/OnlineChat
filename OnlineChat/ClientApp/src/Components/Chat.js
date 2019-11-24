import React, { Component } from 'react';

export default class Chat extends Component {
    getWindowHeight = () => {
        const height = document.body.scrollHeight * 0.9236;
        return { height: `${height}px`, position: 'relative' }
    }

    render() {
        return (
            <div className="container p-2 rtl text-right sans">
                <div className="card card-body p-1">
                    <div className="mb-1">
                        تعداد افراد آنلاین: 1
                    </div>
                    <div className="card p-1 chat-area" style={this.getWindowHeight()}>
                        123
                        <input className="form-control" />
                        <button className="btn btn-link">
                            <span className="fa fa-send-o"></span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}