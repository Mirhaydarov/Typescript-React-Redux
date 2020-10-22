// Core
import React, { FC, ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Route path
import { book } from './book';

export const pageNotFound = (): ReactElement => (
  <h2>404: Not Found</h2>
);

export const Routes: FC = (): ReactElement => (
  <>
    <Switch>
      <Route component={pageNotFound} />
      <Redirect to={book.root} />
    </Switch>
  </>
);