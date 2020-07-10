import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import {
    BrowserRouter as Router,
    Redirect, Route, Switch,
} from 'react-router-dom';

import IssueList from './IssueList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = () => (
    <Router>
        <Switch>
            <Route
                exact
                path="/"
                render={() => (<Redirect to={{ pathname: '/issues' }} />)}
            />
            <Route exact path="/issues" component={IssueList} />
            <Route exact path="/issues/:id" component={IssueEdit} />
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    </Router>
);

debug.enable('app:*');

ReactDOM.render(<App />, contentNode); // Render the component inside the contentNode

if (module.hot) {
    module.hot.accept();
}
