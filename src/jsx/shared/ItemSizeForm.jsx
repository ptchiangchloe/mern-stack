import React from 'react';
import { sizes } from '../ItemMeta';
import { createRandomID } from '../../../utils';

export const ItemSizeForm = (props) => {
    const { handleChange, selectedSize } = props; 

    return (
        <div className="form-group" onChange={handleChange}>
            <label>SIZE:</label>
            <select id="size" className="form-control">
                {
                    Object.keys(sizes).map((size) => {
                        return (
                            <option 
                                value={size} 
                                key={createRandomID()} 
                                selected={selectedSize === size}
                            >
                                {sizes[size]}
                            </option>
                        )
                    })
                }          
            </select>
        </div>
    )
}