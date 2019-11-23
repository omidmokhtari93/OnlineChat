import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Assets/scss/common.scss'
import 'react-notifications-component/dist/theme.css'
import 'react-loading-bar/dist/index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

registerServiceWorker();
