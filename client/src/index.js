// import { render } from 'react-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// render(<App />, document.getElementById('root'));

ReactDOM.hydrate(<App />, document.getElementById('root'));