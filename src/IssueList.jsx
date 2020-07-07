import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import debug from 'debug';
import IssueAdd from './IssueAdd';
import { IssueFilter } from './IssueFilter';

const log = debug('app:issueList');

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('/api/issues').then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    log(`Total count of records: ${data._metadata.total_count}`);
                    data.records.forEach((issue) => {
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

    createIssue(newIssue) {
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

    render() {
        const { issues } = this.state;
        return (
            <div>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </div>
        );
    }
}

const IssueTable = ({ issues }) => (
    <table style={{ borderTop: '3px solid green', padding: '16px' }}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Completion Date</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            {
                issues.map((issue) => <IssueRow key={issue._id} issue={issue} />)
            }
        </tbody>
    </table>
);

const IssueRow = ({ issue }) => (
    <tr>
        <td>{issue._id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
    </tr>
);

IssueRow.propTypes = {
    issue: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        effort: PropTypes.number,
        completionDate: PropTypes.instanceOf(Date),
        title: PropTypes.string,
    }).isRequired,
};

IssueTable.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
