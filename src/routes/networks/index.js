import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import start from './start';
import page from './page';
import BusinessQuestions from './businessQuestions';
import CampaignDetails from './campaignDetails';
import CampaignQuestions from './campaignQuestions';
import Dashboard from './dashboard';

export default ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
        <Route path={`${match.url}/start`} component={start} />
        <Route path={`${match.url}/page`} component={page} />
        <Route path={`${match.url}/businessque`} component={BusinessQuestions} />
        <Route path={`${match.url}/campaignque`} component={CampaignQuestions} />
        <Route path={`${match.url}/campaigndetails`} component={CampaignDetails} />
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Redirect to="/error" />
    </Switch>
);