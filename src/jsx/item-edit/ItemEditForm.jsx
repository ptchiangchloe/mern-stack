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
        let { handleSubmit, handleChange, item } = this.props;

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>ID: {item._id}</label>
                    </div>
                    <ItemBrandForm selectedBrand={item.brand} handleChange={handleChange} />
                    <ItemCategoryForm handleChange={handleChange} selectedCategory={item.category} />
                    <ItemColorForm handleChange={handleChange} selectedColor={item.color} />
                    <ItemSizeForm handleChange={handleChange} selectedSize={item.size} />
                    <ItemDateForm selectedDate={item.purchaseDate} />
                    <ItemNoteForm note={item.note} handleChange={handleChange} />
                    <button type="submit">Submit</button>
                    <Link to="/issues">Back to item list</Link>
                </form>
            </div>
        )
    }
}