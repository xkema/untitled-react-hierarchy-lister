import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.component.jsx';
import dataset from '../data/data.json';

ReactDOM.render(
  <App dataset={dataset} />,
  document.getElementById('root')
);