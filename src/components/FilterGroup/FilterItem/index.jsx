import React from 'react';
import { Badge } from "react-bootstrap";
import './index.css'

const FilterItem = ({ item, handleSelectedItem, selectedItem }) => {

    const handleClick = (event) => {
        handleSelectedItem(event.target.id) 
    }

    return (
        <li onClick={handleClick} id={item} className="m-2">
            <Badge id={item} pill className={selectedItem === item ? "p-3 badge-brand text-white active" : "p-3 badge-brand text-white"}>{item}</Badge>
        </li>
    );
}

export default FilterItem