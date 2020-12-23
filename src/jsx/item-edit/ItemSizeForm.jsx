import React from 'react';
import { sizes } from '../ItemMeta';

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const ItemSizeForm = (props) => {
    return (
        <div className="form-group" onChange={props.handleChange}>
            <label>SIZE:</label>
            <select id="size" className="form-control">
                {
                    Object.keys(sizes).map((size) => {
                        return (
                            <option value={size} key={ID()} selected={props.item.size === size}>
                                {sizes[size]}
                            </option>
                        )
                    })
                }          
            </select>
        </div>
    )
}