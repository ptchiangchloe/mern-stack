import * as React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';
import "core-js/stable";
import 'regenerator-runtime/runtime';

import RoutedApp from './Router';
import '../scss/App.scss';

const contentNode = document.getElementById('contents');

debug.enable('app:*');

ReactDOM.render(<RoutedApp />, contentNode); // Render the component inside the contentNode

if ((module).hot) {
    (module).hot.accept();
}