import * as React from 'react';
import 'whatwg-fetch';
import debug from 'debug';
import { Button, Container } from 'react-bootstrap';

import ItemTable from './ItemTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

const log = debug('app:issueList');

interface MyProps {
    location: any,
    history: any,
}

interface MyState {
    items: Array<object>,
}

export default class ItemList extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = { 
            items: []
        };

        this.createIssue = this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps: any) {
        const { location } = this.props;
        const oldQuery = prevProps.location.search;
        const newQuery = location.search;
        if (oldQuery === newQuery) {
            return;
        }
        this.loadData();
    }

    setFilter(query: string) {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?${new URLSearchParams(query)}`,
        });
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

    createIssue(newIssue: any) {
        // console.log(newIssue)
        const { items } = this.state;
        fetch('/api/issues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newIssue),
        }).then((response) => {
            log(response);
            if (response.ok) {
                response.json().then((updatedIssue) => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    const newIssues = items.concat(updatedIssue);
                    this.setState({ items: newIssues });
                });
            } else {
                response.json().then((error) => {
                    alert(`Failed to add issues: ${error.message}`);
                });
            }
        }).catch((err) => { alert(`Failed in sending data to server: ${err.message}`); });
    }

    deleteIssue(id: string) {
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
            <Container>
                <IssueFilter
                    setFilter={this.setFilter}
                    initFilter={this.props.location.search}
                />
                <hr />
                <ItemTable
                    items={items}
                />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <Button
                    type="button"
                >
                    Click Me

                </Button>
            </Container>
        );
    }
}
