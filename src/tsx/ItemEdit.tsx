import React from 'react';
import { Link } from 'react-router-dom';
// import NumInput from './NumInput';
import DateInput from './DateInput';
import { Container } from 'react-bootstrap';

interface myProps {
    match: any
}

interface myState {
    item: any,
    invalidFields: any
}

export default class IssueEdit extends React.Component<myProps, myState> { // eslint-disable-line
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
            },
            invalidFields: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onValidityChange = this.onValidityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadData();
        }
    }

    onValidityChange(event: React.FormEvent, valid: boolean) {
        const invalidFields = { ...this.state.invalidFields };
        const target = event.target as HTMLInputElement;
        if (!valid) {
            invalidFields[target.name] = true;
        } else {
            delete invalidFields[target.name];
        }
        this.setState({ invalidFields });
    }

    onChange(
        e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, 
        convertedValue?: any
    ) {
        const item = { ...this.state.item };
        const target = e.target as HTMLInputElement;
        const value = (convertedValue !== undefined) ? convertedValue :target.value;
        item[target.name] = value;
        this.setState({ item });
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
        console.log(this.state.item)
        let updatedItem = Object.assign({}, this.state.item);
        updatedItem[e.target.id] = e.target.value
        this.setState({
            item: updatedItem
        })        
    }

    onSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

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
        const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null
            : (<div className="error">Please correct invalid fields before submitting.</div>);
        return (
            <Container>
                <div className="form-container">
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <label>ID: {item._id}</label>
                        </div>
                        <div className="form-group">
                            <label>BRAND</label>
                            <input type="text" className="form-control" id="brand" onChange={this.handleChange}></input>
                        </div>
                        CATEGORY:
                        {' '}
                        {item.category}
                        <br />
                        COLOR:
                        {' '}
                        {item.color}
                        <br />
                        PRICE:
                        {' '}
                        {item.price}
                        <br />
                        PURCHASE DATE:
                        <DateInput
                            onValidityChange={this.onValidityChange}
                            name="completionDate"
                            value={item.purchaseDate}
                            onChange={this.onChange}
                            size={40}
                        />
                        <br />
                        NOTE:
                        {item.note}
                        <br />
                        {validationMessage}
                        <button type="submit">Submit</button>
                        <Link to="/issues">Back to item list</Link>
                    </form>
                </div>
            </Container>
        );
    }
}

