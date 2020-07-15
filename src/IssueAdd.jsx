import React from 'react';
import PropTypes from 'prop-types';

export default class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleSubmit(e) {
        const { createIssue } = this.props;
        const form = document.forms.issueAdd;
        e.preventDefault();
        createIssue({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            created: new Date(),
        });
        // clear the form for the next input
        form.owner.value = '';
        form.title.value = '';
    }

    render() {
        console.log('IssueAdd component rendering');
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button type="submit">Add New Task</button>
                </form>
            </div>
        );
    }
}

IssueAdd.propTypes = {
    createIssue: PropTypes.func.isRequired,
};
