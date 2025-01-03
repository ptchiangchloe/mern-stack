import * as React from 'react';
import '../scss/Typography.scss';

import {
    BrowserRouter as Router,
    Redirect, Route, Switch,
} from 'react-router-dom';

import { withRouter } from 'react-router';

import Navbar from './Navbar';
import ItemList from './item-list/ItemList';
import ItemEdit from './item-edit/ItemEdit';

const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => (
    <div className="roboto-regular">
        <Navbar />
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (<Redirect to={{ pathname: '/issues' }} />)}
                />
                <Route exact path="/items" component={withRouter(ItemList)} />
                <Route exact path="/items/:id" component={ItemEdit} />
                <Route path="*" component={NoMatch} />
            </Switch>
        </Router>
    </div>
);

export default RoutedApp;