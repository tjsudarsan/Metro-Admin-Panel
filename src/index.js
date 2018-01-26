import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import {Provider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import registerServiceWorker from './registerServiceWorker';

const options = {
    timeout: 2000,
    position: 'top center'
  }

ReactDOM.render(
    <Provider template={AlertTemplate} {...options}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
