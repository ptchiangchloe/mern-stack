import * as React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import {
    BrowserRouter as Router,
    Redirect, Route, Switch,
} from 'react-router-dom';

import { withRouter } from 'react-router';

import ItemList from './ItemList';
import IssueEdit from './IssueEdit';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
    <div>
        <div className="header">
            <h1>My Closet App</h1>
        </div>
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (<Redirect to={{ pathname: '/issues' }} />)}
                />
                <Route exact path="/issues" component={withRouter(ItemList)} />
                <Route exact path="/issues/:id" component={IssueEdit} />
                <Route path="*" component={NoMatch} />
            </Switch>
        </Router>
    </div>
);

debug.enable('app:*');

ReactDOM.render(<RoutedApp />, contentNode); // Render the component inside the contentNode

if ((module as any).hot) {
    (module as any).hot.accept();
}

