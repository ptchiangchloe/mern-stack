import React from 'react'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const ItemDateForm = (props) => {
    const { selectedDate, handleChange } = props;
    return (
        <div className="form-group">
            <label htmlFor="category-select">Purchase Date</label>
            <DatePicker 
                type="text" 
                name="purchaseDate" 
                selectedDate={selectedDate}
                onChange={handleChange} 
                className="form-control"
            />
        </div>
    )
}