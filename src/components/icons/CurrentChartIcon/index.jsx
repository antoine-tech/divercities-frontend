import React from 'react';

const CurrentChartIcon = ({fillColor}) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 23H4V5H6V21H8V12H12V21H14V8H18V21H20V16H24V23Z" fill={fillColor} />
        </svg>
    )
}

export default CurrentChartIcon;