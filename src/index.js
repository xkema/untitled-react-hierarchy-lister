import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.component.jsx';
import dataset from '../data/dataset.json';
import datasetVikings from '../data/the-lost-vikings-three.json';

ReactDOM.render(
  <App dataset={dataset} datasetVikings={datasetVikings} />,
  document.getElementById('root')
);