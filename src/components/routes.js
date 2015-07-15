import React    from 'react';
import MlApp from './MlApp';
import MlMain from './MlMain';
import UserList from './UserList';
import Menu from './Menu';
import { Route, DefaultRoute } from 'react-router';

export default (
  <Route name="/" handler={MlApp} path="/">
    <Route name="ml-list" handler={MlMain} />
    <DefaultRoute handler={MlMain} />
  </Route>
);
