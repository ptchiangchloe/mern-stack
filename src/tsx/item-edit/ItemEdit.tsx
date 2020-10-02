import React from 'react';
import { Container } from 'react-bootstrap';
import ItemEditForm from './ItemEditForm';

interface myProps {
    match: any
}

interface myState {
    item: any,
    invalidFields: any
}

export default class ItemEdit extends React.Component<myProps, myState> { // eslint-disable-line
    constructor(props) {
        super(props);
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
        fetch(`/api/items/${this.props.match.params.id}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((item) => {
                        item.purchaseDate = item.purchaseDate != null ? new Date(item.purchaseDate) : null;
                        this.setState({ item });
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
        console.log(e.target.id);
        let updatedItem = Object.assign({}, this.state.item);

        updatedItem[e.target.id] = e.target.value
        console.log(updatedItem)

        this.setState({
            item: updatedItem
        })        
    }
    
    handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        console.log(this.state.item.size)

        if (Object.keys(this.state.invalidFields).length !== 0) {
            return;
        }

        fetch(`/api/items/${this.props.match.params.id}`, {
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
            <Container>
                <ItemEditForm 
                    item = {item}
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange}
                />
            </Container>
        );
    }
}

