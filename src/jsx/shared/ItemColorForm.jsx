import React from 'react';
import { colors } from '../ItemMeta';

export const ItemColorForm = (props) => {
    const { selectedColor, handleChange } = props;
    return (
        <div className="form-group" onChange={handleChange}>
            <label>COLOR:</label>
            <select id="color" className="form-control">
                {
                    Object.keys(colors).map((color, idx) => {
                        return (
                            <option value={color} key={idx} selected={selectedColor === color}>{colors[color]}</option>
                        )
                    })
                }          
            </select>
        </div>
    )
}