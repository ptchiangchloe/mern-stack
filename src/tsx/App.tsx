import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import * as React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import RoutedApp from './Router';
import '../scss/App.scss';

const contentNode = document.getElementById('contents');

debug.enable('app:*');

ReactDOM.render(<RoutedApp />, contentNode); // Render the component inside the contentNode

if ((module as any).hot) {
    (module as any).hot.accept();
}

