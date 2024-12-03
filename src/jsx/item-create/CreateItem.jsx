import React from 'react';
import { 
    categories as categoriesForSelections,
    colors as colorsForSelections 
} from '../ItemMeta';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../scss/CreateItem.scss';
import { ItemBrandForm } from '../shared/ItemBrandForm';
import { ItemSizeForm } from '../shared/ItemSizeForm';

export default class CreateItem extends React.Component{
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        targetDate: '',
        targetBrand: ''
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createItem } = this.props;
        const forms = document.forms
        // access create item form inputs. 
        const form = forms.itemAdding;
        const {brand, category, color, purchaseDate, note, size} = form;

        createItem({
            brand: brand.value,
            category: category.value,
            color: color.value,
            size: size.value,
            purchaseDate: purchaseDate.value,
            note: note.value
        });

        // Via Javascript from Bootstrap. 
        $('#create-modal').modal('hide');

        // clear the form for the next input
        // todo: add an alert to indicate the result of the action.
        brand.value = '';
        category.value = '';
        color.value = '';
        purchaseDate.value = '';
        note.value = '';
    }

    setTargetDate = (e) => {
        this.setState({
            targetDate: e
        })
    }

    setBrandName = (e) => {
        this.setState({
            targetBrand: e
        })
    }

    render() {
        const {targetDate, targetBrand} = this.state;
        console.log(targetDate)
        return (
            <div className="modal-container create-item-modal">
                <div>
                    <button 
                        className="btn btn-primary" 
                        type="button" 
                        data-toggle="modal" 
                        data-target="#create-modal"
                    >
                        Create a new Item
                    </button>
                </div>
                <div className="modal fade" tabIndex="-1" role="dialog" id="create-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create a new item</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form name="itemAdding" onSubmit={this.handleSubmit}>
                                    <ItemBrandForm 
                                        targetBrand={targetBrand}
                                        handleChange={this.handleChange}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="category-select">Category</label>
                                        <select className="form-control" name="category" id="category-select">
                                            <option key={0}></option>
                                            {
                                                Object.entries(categoriesForSelections).map((item, index) => 
                                                    <option key={index+1}>{item[1]}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category-select">Color</label>
                                        <select className="form-control" name="color" id="color-select">
                                            <option key={0}></option>
                                            {
                                                Object.entries(colorsForSelections).map((item, index) => 
                                                    <option key={index+1}>{item[1]}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <ItemSizeForm handleChange={this.handleChange} selectedSize={'S'}/>
                                    <div className="form-group">
                                        <label htmlFor="category-select">Purchase Date</label>
                                        <DatePicker type="text" name="purchaseDate" 
                                            selected={targetDate}
                                            // By default, JavaScript will use the browser's time zone and display a date as a full text string:
                                            onChange={this.setTargetDate} 
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category-select">Note</label>
                                        <textarea className="form-control" 
                                        type="text" name="note" placeholder="Write your additional notes here..." 
                                        rows="3"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add New Item</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

