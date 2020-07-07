import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import IssueList from './IssueList';

const contentNode = document.getElementById('contents');

debug.enable('app:*');

ReactDOM.render(<IssueList />, contentNode); // Render the component inside the contentNode

if (module.hot) {
    module.hot.accept();
}
