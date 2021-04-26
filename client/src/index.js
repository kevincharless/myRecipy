import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import './assets/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './assets/css/custom.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
