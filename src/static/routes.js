import React from 'react';
import { Route, Switch } from 'react-router';
import { LoginView, HomeView, ProtectedView, NotFoundView, RegisterView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Switch>
        <Route exact path="/" component={RegisterView} />
        <Route path="/home" component={HomeView} />
        <Route path="/login" component={LoginView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
