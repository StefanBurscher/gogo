import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import start from './start';
import page from './page'

export default ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
        <Route path={`${match.url}/start`} component={start} />
        <Route path={`${match.url}/page`} component={page} />
        <Redirect to="/error" />
    </Switch>
);