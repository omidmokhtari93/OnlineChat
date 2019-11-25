import React from 'react';

const ReceiverBadge = (props) => {
    return (
        <div className="receiver-badge">
            <div className="d-inline-block p-1">
                <p>{props.message}</p>
                <span>{props.datetime}</span>
            </div>
        </div>
    )
}

export default ReceiverBadge;