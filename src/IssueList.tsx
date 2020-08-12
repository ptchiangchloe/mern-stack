import * as React from 'react';
import 'whatwg-fetch';
import debug from 'debug';
import { Button, Container } from 'react-bootstrap';

import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

const log = debug('app:issueList');

interface MyProps {
    location: any,
    history: any,
}

interface MyState {
    issues: Array<object>,
}

export default class IssueList extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = { 
            issues: [],
            name: props.match.path.substring(1)
        };
        console.log(this.state.name)
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
        fetch(`/api/issues${this.props.location.search}`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    log(`Total count of records: ${data._metadata.total_count}`);
                    data.records.forEach((issue: {
                        created: any,
                        completionDate: any,
                    }) => {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate) {
                            issue.completionDate = new Date(issue.completionDate);
                        }
                    });
                    this.setState({ issues: data.records });
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
        const { issues } = this.state;
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
                    const newIssues = issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
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
        const { issues } = this.state;

        return (
            <Container>
                <IssueFilter
                    setFilter={this.setFilter}
                    initFilter={this.props.location.search}
                />
                <hr />
                <IssueTable
                    issues={issues}
                    deleteIssue={this.deleteIssue}
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

