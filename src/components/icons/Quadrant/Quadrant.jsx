import React from 'react'
import quadrant_grey from './img/quadrant_grey.png'

const QuadrantGrey = ({ label }) => {
    return (

        <div className="position-relative d-flex align-items-center justify-content-center">
            <img src={quadrant_grey} alt="quadrant" className="img-fluid" />
            <p style={{fontSize:"2rem", top: "45%"}} className="position-absolute text-white font-weight-bold">{label}</p>
        </div>
    )
}
export default QuadrantGrey