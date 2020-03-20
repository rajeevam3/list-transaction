import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './view/Home';
import Account from './view/Account';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:id' component={Account} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;