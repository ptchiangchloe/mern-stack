import React from 'react';
import { Link } from 'react-router-dom';
import DateInput from '../DateInput';
import { ItemCategoryForm } from './ItemCategoryForm';
import { ItemColorForm } from './ItemColorForm';
import { ItemSizeForm } from '../shared/ItemSizeForm';
import { ItemBrandForm } from '../shared/ItemBrandForm';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ItemEditForm extends React.Component {
    render() {
        let {handleSubmit, handleChange, item} = this.props;

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>ID: {item._id}</label>
                    </div>
                    <ItemBrandForm 
                        targetBrand={item.brand}
                        handleChange={handleChange}
                    />
                    <ItemCategoryForm handleChange={handleChange} />
                    <ItemColorForm handleChange={handleChange} item={item}/>
                    <ItemSizeForm handleChange={handleChange} selectedSize={item.size}/>
                    <div className="form-group">
                        <label htmlFor="category-select">Purchase Date</label>
                        <DatePicker type="text" name="purchaseDate" 
                            selected={item.purchaseDate}
                            onChange={this.setTargetDate} 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category-select">Note</label>
                        <textarea className="form-control" 
                        type="text" name="note" value={item.note} onChange={handleChange} 
                        rows="3"/>
                    </div>
                    <button type="submit">Submit</button>
                    <Link to="/issues">Back to item list</Link>
                </form>
            </div>
        )
    }
}