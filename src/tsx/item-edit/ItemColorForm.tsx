import React from 'react';
import { colors } from '../ItemMeta';

interface MyProps {
    handleChange: any,
    item: any,
}

export const ItemColorForm: React.FC<MyProps> = (props) => {
    return (
        <div className="form-group" onChange={props.handleChange}>
            <label>COLOR:</label>
            <select id="color" className="form-control">
                {
                    Object.keys(colors).map((color) => {
                        return (
                            <option value={color} selected={props.item.color === color}>{colors[color]}</option>
                        )
                    })
                }          
            </select>
        </div>
    )
}