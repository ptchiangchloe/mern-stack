import React from 'react';
import { Link } from 'react-router-dom';
import DateInput from '../DateInput';
import { ItemCategoryForm } from './ItemCategoryForm';
import { ItemColorForm } from './ItemColorForm';
import { ItemSizeForm } from './ItemSizeForm';

interface Prop {
    handleSubmit: any,
    handleChange: any,
    item: {
        _id: string,
        brand: string,
        category: string,
        color: string,
        price: string,
        purchaseDate: string,
        note: string
    }
}

export default class ItemEditForm extends React.Component<Prop> {
    render() {
        let {handleSubmit, handleChange, item} = this.props

        console.log(item)

        return (
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label>ID: {item._id}</label>
                    </div>
                    <div className="form-group">
                        <label>BRAND</label>
                        <input type="text" className="form-control" id="brand" onChange={handleChange} value={item.brand}></input>
                    </div>
                    <ItemCategoryForm handleChange={handleChange} />
                    <ItemColorForm handleChange={handleChange} item={item}/>
                    <ItemSizeForm handleChange={handleChange} item={item}/>
                    PURCHASE DATE:
                    <DateInput
                        name="completionDate"
                        value={item.purchaseDate}
                        size={40}
                    />
                    <br />
                    NOTE:
                    {item.note}
                    <br />

                    <button type="submit">Submit</button>
                    <Link to="/issues">Back to item list</Link>
                </form>
            </div>
        )
    }
}