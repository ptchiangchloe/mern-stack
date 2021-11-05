import React from 'react';
import { sizes } from '../ItemMeta';
import { createRandomID } from '../../../utils';

export const ItemSizeForm = (props) => {
    return (
        <div className="form-group" onChange={props.handleChange}>
            <label>SIZE:</label>
            <select id="size" className="form-control">
                {
                    Object.keys(sizes).map((size) => {
                        return (
                            <option value={size} key={createRandomID()} selected={props.item.size === size}>
                                {sizes[size]}
                            </option>
                        )
                    })
                }          
            </select>
        </div>
    )
}