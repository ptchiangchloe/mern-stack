import React from 'react';
import ItemEditForm from './ItemEditForm';
import '../../scss/EditItem.scss';

export default class ItemEdit extends React.Component { // eslint-disable-line
    constructor(props) {
        super();
        this.state = {
            item: {
                _id: '',
                brand: '',
                category: '',
                color: '',
                price: '',
                purchaseDate: null,
                note: '',
                size: '',
            },
            invalidFields: {}
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadData();
        }
    }

    loadData() {
        fetch(`/api/item/${this.props.match.params.id}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((item) => {
                        console.log(item[0].purchaseDate);
                        item[0].purchaseDate = item[0].purchaseDate !== null ? new Date(item[0].purchaseDate) : null;
                        this.setState({ item: item[0] });
                    });
                } else {
                    response.json().then((error) => {
                        alert(`Failed to fetch issue: ${error.message}`);
                    });
                }
            })
            .catch((err) => {
                alert(`Error in fetching data from server: ${err.message}`);
            });
    }

    handleChange = (e) => {
        let updatedItem = Object.assign({}, this.state.item);
        updatedItem[e.target.name] = e.target.value

        this.setState({
            item: updatedItem
        })        
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state.item)

        if (Object.keys(this.state.invalidFields).length !== 0) {
            return;
        }

        fetch(`/api/item/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.item),
        }).then((response) => {
            if (response.ok) {
                response.json().then((updatedItem) => {
                    if (updatedItem.purchaseDate) {
                        updatedItem.purchaseDate = new Date(updatedItem.purchaseDate);
                    }
                    this.setState({ item: updatedItem });
                    alert('Updated issue successfully.');
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to update issue: ${error.message}`);
                });
            }
        }).catch((err) => {
            alert(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {
        const { item } = this.state;

        return (
            <div className="edit-item-container">
                <ItemEditForm 
                    item = {item}
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}

