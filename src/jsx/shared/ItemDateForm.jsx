import React, { useState } from 'react'

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const ItemDateForm = (props) => {
    const { selectedDate, handleChange } = props;
    console.log(new Date(selectedDate))
    console.log(selectedDate)
    return (
        <div className="form-group">
            <label htmlFor="category-select">Purchase Date</label>
            <DatePicker 
                id="purchaseDate" 
                selected={selectedDate}
                onChange={handleChange} 
                className="form-control"
            />
        </div>
    )
}