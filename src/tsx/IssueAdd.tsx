import React from 'react';

type Props = {
    createIssue: any,
}

export default class IssueAdd extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const { createIssue } = this.props;
        const forms: any = document.forms
        const form = forms.issueAdding;

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
                <form name="issueAdding" onSubmit={this.handleSubmit}>
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <button type="submit">Add New Task</button>
                </form>
            </div>
        );
    }
}

