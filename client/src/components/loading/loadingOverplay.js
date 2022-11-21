import React from 'react';
import './mloading.css';
const LoadingOverplay = () => {
    return (
        <>
            <div className="m-overlay m-show"></div>
            <div className="m-spanner m-show">
                <div className="m-loader"></div>
                <p></p>
            </div>
        </>
    );
};

export default LoadingOverplay;
