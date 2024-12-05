import React from 'react';
import { Link } from 'react-router-dom';

import { ItemCategoryForm } from '../shared/ItemCategoryForm';
import { ItemColorForm } from '../shared/ItemColorForm';
import { ItemSizeForm } from '../shared/ItemSizeForm';
import { ItemBrandForm } from '../shared/ItemBrandForm';
import { ItemNoteForm } from '../shared/ItemNoteForm';
import { ItemDateForm } from '../shared/ItemDateForm';

export default class ItemEditForm extends React.Component {
    render() {
        let { handleSubmit, handleChange, handleDateChange, item } = this.props;

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>Product ID: {item._id}</label>
                    </div>
                    <ItemBrandForm handleChange={handleChange} selectedBrand={item.brand} />
                    <ItemCategoryForm handleChange={handleChange} selectedCategory={item.category} />
                    <ItemColorForm handleChange={handleChange} selectedColor={item.color} />
                    <ItemSizeForm handleChange={handleChange} selectedSize={item.size} />
                    <ItemDateForm handleChange={handleDateChange} selectedDate={item.purchaseDate} />
                    <ItemNoteForm handleChange={handleChange} note={item.note} />
                    <button type="submit">Submit</button>
                    <Link to="/issues">Back to item list</Link>
                </form>
            </div>
        )
    }
}