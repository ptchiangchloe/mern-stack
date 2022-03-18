/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import * as React from 'react';
import 'whatwg-fetch';
import debug from 'debug';
import ItemTable from './ItemTable';
import CreateItem from '../item-create/CreateItem';
import CreateBrandLabel from '../CreateBrandLabel';

const log = debug('app:issueList');

export default class ItemList extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            brands: []
        };

        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        this.loadItemsData();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.items);
        const { location } = this.props;
        const oldQuery = prevProps.location.search;
        const newQuery = location.search;

        if (oldQuery === newQuery) {
            return;
        }
    }

    loadItemsData() {
        fetch(`/api/items${this.props.location.search}`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    log(`Total count of records: ${data._metadata.total_count}`);
                    this.setState({ items: data.records });
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to fetch issues: ${error.message}`);
                });
            }
        }).catch((err) => {
            log(err);
        });
    }

    createItem(newItem) {
        const { items } = this.state;

        // Before sending it to server, we should check if there's dangerous data that can hurt our server
        fetch('/api/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        }).then((response) => {
            log(response);
            if (response.ok) {
                response.json().then((updatedItem) => {
                    const newItems = items.concat(updatedItem.body);
                    this.setState({ items: newItems });
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to add issues: ${error.message}`);
                });
            }
        }).catch((err) => { alert(`Failed in sending data to server: ${err.message}`); });
    }

    deleteItem(id) {
        fetch(`/api/items/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                alert('Failed to delete issue');
            } else {
                this.loadItemsData();
            }
        });
    }

    render() {
        const { items, brands } = this.state;

        return (
            <div className="container">
                <ItemTable
                    items={items}
                    deleteItem={this.deleteItem}
                />
                <hr />
                <CreateItem
                    createItem={this.createItem}
                />
                <CreateBrandLabel/>
            </div>
        );
    }
}
