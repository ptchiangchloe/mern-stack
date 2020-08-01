import * as React from 'react';
import 'whatwg-fetch';
import debug from 'debug';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
        this.state = { issues: [] };
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
            <div>
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
                <button
                    type="button"
                >
                    Click Me
                </button>
            </div>
        );
    }
}

type TableProps = {
    issues: any,
    deleteIssue: any
}

const IssueTable: React.FC<TableProps> = ({ issues, deleteIssue }) => (
    <table style={{ borderTop: '3px solid red', padding: '16px' }}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Completion Date</th>
                <th>Title</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {
                issues.map((issue: {_id: string}) => <IssueRow key={issue._id} issue={issue} deleteIssue={deleteIssue} />)
            }
        </tbody>
    </table>
);

type RowProps = {
    issue: any,
    deleteIssue: any
}

const IssueRow: React.FC<RowProps> = ({ issue, deleteIssue }) => {
    function onDeleteClick() {
        deleteIssue(issue._id);
    }

    return (
        <tr>
            <td>
                <Link to={`/issues/${issue._id}`}>
                    {issue._id.substr(-4)}
                </Link>
            </td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ? issue.completionDate.toISOString().substr(0, 10) : ''}</td>
            <td>{issue.title}</td>
            <td><Button size="sm" onClick={onDeleteClick}><span className="glyphicon glyphicon-trash" aria-hidden="true" /></Button></td>
        </tr>
    );
};

