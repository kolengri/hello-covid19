import React from 'react';

import { StoreProvider } from 'easy-peasy';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';

import { ROOT_ID } from './config';

const rootElement = document.getElementById(ROOT_ID);

export const render = (Component: React.FC) => {
  return ReactDOM.render(
    <React.StrictMode>
      <StoreProvider store={store}>
        <Router>
          <Component />
        </Router>
      </StoreProvider>
    </React.StrictMode>,
    rootElement
  );
};
