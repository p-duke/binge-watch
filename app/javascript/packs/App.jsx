import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Router from './Router';

const App = props => (
  <div>
    <Header />
    <Router />
  </div>
)

export default App;

// This can be broken into an index.js file eventually
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'))
});


