import * as React from 'react';
import 'whatwg-fetch';
import debug from 'debug';
import ItemTable from './ItemTable';
import CreateItem from '../CreateItem';
import CreateBrandLabel from '../CreateBrandLabel';

const log = debug('app:issueList');

export default class ItemList extends React.Component {
    constructor(props) {
        super();
        this.state = { 
            items: [],
            brands: []
        };

        this.createItem = this.createItem.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.fetchBrandData = this.fetchBrandData.bind(this);

    }

    componentDidMount() {
        this.loadData();
        this.fetchBrandData();
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        const oldQuery = prevProps.location.search;
        const newQuery = location.search;
        if (oldQuery === newQuery) {
            return;
        }
        this.loadData();
    }

    setFilter(query) {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?${new URLSearchParams(query)}`,
        });
    }

    fetchBrandData() {
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

    loadData() {
        fetch(`/api/items${this.props.location.search}`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    log(`Total count of records: ${data._metadata.total_count}`);
                    data.records.forEach((item) => {
                        
                    });
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
                    const newItem = items.concat(updatedItem);
                    this.setState({ item: newItem });
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to add issues: ${error.message}`);
                });
            }
        }).catch((err) => { alert(`Failed in sending data to server: ${err.message}`); });
    }

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) alert('Failed to delete issue');
            else this.loadData();
        });
    }

    render() {
        const { items } = this.state;

        return (
            <div className="container">
                <ItemTable
                    items={items}
                />
                <hr />
                <CreateItem createItem={this.createItem} brands={this.state.brands}/>
                <CreateBrandLabel updateBrandData={this.fetchBrandData} />
            </div>
        );
    }
}
