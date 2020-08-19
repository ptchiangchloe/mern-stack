import * as React from 'react';
import IssueRow from './IssueRow';

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

export default IssueTable;
