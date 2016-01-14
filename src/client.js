import App from './app'

import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import routes from './routes';
import clientHistory from './clientHistory';

var root = document.getElementById('app-root');
ReactDOM.render(
  <Router history={clientHistory}>{routes}</Router>
, root);
