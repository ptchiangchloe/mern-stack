import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import debug from 'debug';
import { Link } from 'react-router-dom';

import IssueAdd from './IssueAdd';
import  IssueFilter  from './IssueFilter';


const log = debug('app:issueList');

export default class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        this.loadData();
        // this.testThis = this.testThis.bind(this)
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
            search: "?" + new URLSearchParams(query)
        });
    }

    loadData() {
        fetch(`/api/issues${this.props.location.search}`).then((response) => {
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
                <IssueFilter  setFilter={this.setFilter}
                    initFilter={this.props.location.search}/>
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <button
                    type="button"
                    onClick={this.testThis}
                >
                    Click Me
                </button>
            </div>
        );
    }
}

const IssueTable = ({ issues }) => (
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
        <td>
            <Link to={`/issues/${issue._id}`}>
                {issue._id.substr(-4)}
            </Link>
        </td>
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

IssueList.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string.isRequired,
    }),
};
