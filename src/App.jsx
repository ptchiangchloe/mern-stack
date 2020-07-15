import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import {
    BrowserRouter as Router,
    Redirect, Route, Switch,
} from 'react-router-dom';

import { withRouter } from 'react-router';

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
    <div>
        <div className="header">
            <h1>Issue Tracker</h1>
        </div>
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (<Redirect to={{ pathname: '/issues' }} />)}
                />
                <Route exact path="/issues" component={withRouter(IssueList)} />
                <Route exact path="/issues/:id" component={IssueEdit} />
                <Route path="*" component={NoMatch} />
            </Switch>
        </Router>
        <div className="footer">
            Full source code available at this <a href="https://github.com/vasnsr/pro-mern-stack">GitHub repository</a>
        </div>
    </div>
)

debug.enable('app:*');

ReactDOM.render(<RoutedApp />, contentNode); // Render the component inside the contentNode

if (module.hot) {
    module.hot.accept();
}
