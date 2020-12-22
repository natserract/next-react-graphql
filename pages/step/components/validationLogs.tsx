import React from 'react';

export default function StepFormErrorLogs({ logs }) {
    return (
        <div className="error-logs" style={{ marginTop: '20px' }}>
            { JSON.stringify(logs) }
        </div>
    )
}