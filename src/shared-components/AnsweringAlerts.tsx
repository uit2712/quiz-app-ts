import React from 'react';

export default function AnsweringAlerts({
    rightAlertMessage,
    wrongAlertMessage
}: {
    rightAlertMessage: string,
    wrongAlertMessage: string,
}) {
    return (
        <>
            <div
                id='right-answer-alert'
                className="alert alert-success"
                role="alert"
            >
                {rightAlertMessage}
            </div>
            <div
                id='wrong-answer-alert'
                className="alert alert-danger"
                role="alert"
            >
                {wrongAlertMessage}
            </div>
        </>
    )
}