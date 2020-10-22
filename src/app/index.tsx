// Core
import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Instruments
import { store } from './init/store';

// Routes
import { Routes } from './routes';

export const App: FC = (): ReactElement => {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
};
