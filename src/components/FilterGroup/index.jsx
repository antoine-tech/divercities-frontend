import React from 'react';
import FilterItem from './FilterItem/index.jsx';

const FilterGroup = ({ items, filterHeader, headerTop, headerBottom, selectedItem, setSelectedItem }) => {

    const handleSelectedItem = (value) => {
        setSelectedItem(value)
    }

    return (
        <div className="m-2">
            {
                headerTop && <p className="my-2 font-weight-bold">{filterHeader}</p>
            }
            <ul className="m-0 p-0 h-100 w-100 d-flex list-style-none justify-content-start flex-wrap list-unstyled">
                {items.map((item) => <FilterItem key={item} item={item} selectedItem={selectedItem} handleSelectedItem={(value) => handleSelectedItem(value)} />)}
            </ul>
            {
                headerBottom && <p className="my-2 font-weight-bold">{filterHeader}</p>
            }
        </div>
    )
}

export default FilterGroup;