import React from 'react';
import { brands as brandsForSelections } from './ItemMeta';

export default class CreateItem extends React.Component{
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleClick(e) {
        console.log("show modal.");
        document.getElementById('create-modal').style.display = "block";
    }

    handleSubmit(e) {
        const { createItem } = this.props;
        const forms = document.forms
        const form = forms.issueAdding;

        e.preventDefault();
        createItem({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        });
        // clear the form for the next input
        form.owner.value = '';
        form.title.value = '';
    }

    render() {
        return (
            <div className="modal-container">
                <div>
                    <button className="btn btn-primary" type="button" data-toggle="modal"
                        onClick={this.handleClick} data-target="#create-modal"
                    >Create a new Item</button>
                </div>
                <div className="modal fade" tabIndex="-1" role="dialog" id="create-modal">
                    <div className="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 className="modal-title">Create a new item</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form name="issueAdding" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label for="brand-select">Brand</label>
                                        <select class="form-control" name="brand" placeholder="Brand" id="brand-select">
                                            {
                                                Object.entries(brandsForSelections).map((item, index) => 
                                                    <option key={index}>{item[1]}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="category" placeholder="Category" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="color" placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="purchase-date" placeholder="Purchase Date" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="note" placeholder="Note" />
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

