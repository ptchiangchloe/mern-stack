import React from 'react';

type MyProps = {
    createIssue: any,
}

type MyState = {
    
}

export default class IssueAdd extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleSubmit(e: {
        preventDefault: any,
    }) {
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

