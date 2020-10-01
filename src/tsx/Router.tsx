import * as React from 'react';


import {
    BrowserRouter as Router,
    Redirect, Route, Switch,
} from 'react-router-dom';

import { withRouter } from 'react-router';

import Navbar from './Navbar';
import ItemList from './ItemList';
import ItemEdit from './ItemEdit';

const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
    <div>
        <Navbar />
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (<Redirect to={{ pathname: '/issues' }} />)}
                />
                <Route exact path="/issues" component={withRouter(ItemList)} />
                <Route exact path="/items/:id" component={ItemEdit} />
                <Route path="*" component={NoMatch} />
            </Switch>
        </Router>
    </div>
);

export default RoutedApp;