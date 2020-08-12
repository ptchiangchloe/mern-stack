import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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

export default IssueRow;