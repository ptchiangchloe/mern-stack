import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import NumInput from './NumInput';
import DateInput from './DateInput';

export default class IssueEdit extends React.Component { // eslint-disable-line
    constructor() {
        super();
        this.state = {
            issue: {
                _id: '',
                title: '',
                status: '',
                owner: '',
                effort: null,
                completionDate: '',
                created: null,
            },
            invalidFields: {},
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

    onValidityChange(event, valid) {
        const invalidFields = { ...this.state.invalidFields };
        if (!valid) {
            invalidFields[event.target.name] = true;
        } else {
            delete invalidFields[event.target.name];
        }
        this.setState({ invalidFields });
    }

    onChange(e, convertedValue) {
        const issue = { ...this.state.issue };
        const value = (convertedValue !== undefined) ? convertedValue : e.target.value;
        issue[e.target.name] = value;
        this.setState({ issue });
    }

    loadData() {
        fetch(`/api/issues/${this.props.match.params.id}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((issue) => {
                        issue.created = new Date(issue.created);
                        issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
                        this.setState({ issue });
                    });
                } else {
                    response.json().then((error) => {
                        alert(`Failed to fetch issue: ${error.message}`);
                    });
                }
            })
            .catch((err) => {
                alert(`Error in fetching data from server: ${error.message}`);
            });
    }

    onSubmit(e) {
        e.preventDefault();

        if (Object.keys(this.state.invalidFields).length !== 0) {
            return;
        }

        fetch(`/api/issues/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.issue),
        }).then((response) => {
            if (response.ok) {
                response.json().then((updatedIssue) => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if (updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    this.setState({ issue: updatedIssue });
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
        const { issue } = this.state;
        const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null
            : (<div className="error">Please correct invalid fields before submitting.</div>);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    ID:
                    {' '}
                    {issue._id}
                    <br />
                    Created:
                    {' '}
                    {issue.created ? issue.created.toDateString() : ''}
                    <br />
                    Status:
                    <select name="status" value={issue.status} onChange={this.onChange}>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Verified">Verified</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <br />
                    Owner:
                    <input name="owner" value={issue.owner} onChange={this.onChange} />
                    <br />
                    Effort:
                    <NumInput size={5} name="effort" value={issue.effort} onChange={this.onChange} />
                    <br />
                    Completion Date:
                    <DateInput
                        onValidityChange={this.onValidityChange}
                        name="completionDate"
                        value={issue.completionDate}
                        onChange={this.onChange}
                        size={40}
                    />
                    <br />
                    Title:
                    <input name="title" size={50} value={issue.title} onChange={this.onChange} />
                    <br />
                    {validationMessage}
                    <button type="submit">Submit</button>
                    <Link to="/issues">Back to issue list</Link>
                </form>
            </div>
        );
    }
}

IssueEdit.propTypes = {
    match: shape({
        params: shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};