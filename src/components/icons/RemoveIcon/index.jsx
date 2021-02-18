import React from 'react';

const RemoveIcon = ({fillColor, onClick}) => {
    return (
        <svg  style={{cursor:"pointer"}} onClick={onClick} width="32" height="4" viewBox="0 0 28 4" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.551 2H1.77552C1.28165 2 0.877563 1.55 0.877563 1C0.877563 0.45 1.28165 0 1.77552 0H12.551C13.0449 0 13.449 0.45 13.449 1C13.449 1.55 13.0449 2 12.551 2Z" fill={fillColor} />
        </svg>
    )
}

export default RemoveIcon;

