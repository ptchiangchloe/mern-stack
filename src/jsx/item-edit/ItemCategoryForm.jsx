import React from 'react';
import { categories } from '../ItemMeta';

export const ItemCategoryForm = (props) => {
    return (
        <div className="form-group" onChange={props.handleChange}>
            <label>CATEGORY:</label>
            <select id="category" className="form-control">
                {
                    Object.keys(categories).map((category) => {
                        return (
                            <option value={category}>{categories[category]}</option>
                        )
                    })
                }          
            </select>
        </div>
    )
}