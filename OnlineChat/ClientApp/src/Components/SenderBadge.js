import React from 'react';

const SenderBadge = (props) => {
    return(
        <div className="sender-badge">
            <div className="d-inline-block p-1">
                <p>{props.message}</p>
                <span>{props.datetime}</span>
            </div>
        </div>
    )
}

export default SenderBadge;