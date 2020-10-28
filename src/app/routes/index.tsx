// Core
import React, { FC, ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Route path
import { book } from './book';

// Components
import { Nav } from '../components/Nav';
import { UserList } from '../bus/UserList';
import { UserProfile } from '../components/UserProfile';

export const pageNotFound = (): ReactElement => (
  <h2>404: Not Found</h2>
);

export const Routes: FC = (): ReactElement => (
  <>
    <Route component={Nav} path={book.root} />
    <Switch>
      <Route exact component={UserList} path={book.root} />
      <Route
        exact
        component={UserProfile}
        path={`${book.profile}/:userName`}
      />
      <Route component={pageNotFound} />
      <Redirect to={book.root} />
    </Switch>
  </>
);