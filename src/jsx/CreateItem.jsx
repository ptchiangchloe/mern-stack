import React from 'react';
import { 
    categories as categoriesForSelections,
    colors as colorsForSelections 
} from './ItemMeta';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../scss/CreateItem.scss';

export default class CreateItem extends React.Component{
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        targetDate: '',
        brands: '',
    }

    componentDidMount() {
        fetch('/api/brands').then((res) => {
            if(res.ok) {
                res.json().then((data) => {
                    this.setState({
                        brands: data['brands']
                    })
                })
            } else {
                res.json().then((err) => {
                    alert(`Failed to fetch issues: ${err.message}`);
                })
            }
        })
    }

    handleClick(e) {
        console.log("show modal.");
        document.getElementById('create-modal').style.display = "block";
    }

    handleSubmit(e) {
        e.preventDefault();

        const { createItem } = this.props;
        const forms = document.forms
        const form = forms.itemAdding;

        const {brand, category, color, purchaseDate, note} = form;

        createItem({
            brand: brand.value,
            category: category.value,
            color: color.value,
            purchaseDate: purchaseDate.value,
            note: note.value
        });
        // clear the form for the next input
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
        console.log(this.state.targetDate)
    }

    render() {
        const {targetDate, brands} = this.state
        console.log(targetDate)
        return (
            <div className="modal-container">
                <div>
                    <button className="btn btn-primary" type="button" data-toggle="modal"
                        onClick={this.handleClick} data-target="#create-modal"
                    >Create a new Item</button>
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
                                    <div className="form-group">
                                        <label htmlFor="brand-select">Brand</label>
                                        <select className="form-control" name="brand" id="brand-select">
                                            <option key={0}></option>
                                            {
                                                Object.entries(brands).map((item, index) => 
                                                    <option key={index+1}>{item[1]}</option>
                                                )
                                            }
                                        </select>
                                    </div>
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
                                    <div className="form-group">
                                        <label htmlFor="category-select">Purchase Date</label>
                                        <DatePicker type="text" name="purchaseDate" 
                                            selected={targetDate}
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

