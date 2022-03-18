import React from 'react';
import { categories } from '../ItemMeta';

export const ItemCategoryForm = (props) => {
    const { handleChange, selectedCategory } = props
    return (
        <div className="form-group" >
            <label>CATEGORY:</label>
            <select id="category" className="form-control" onChange={handleChange}>
                {
                    Object.keys(categories).map((category) => {
                        const isSelected = selectedCategory === categories[category];
                        return (
                            <option value={category} selected={isSelected}>{categories[category]}</option>
                        )
                    })
                }          
            </select>
        </div>
    )
}