import React from 'react';
import { Route, Switch } from 'react-router';
import {
  LoginView,
  HomeView,
  ProtectedView,
  NotFoundView,
  RegisterView,
  UploadView,
  LocksView,
} from './containers';
import LockView from './containers/Locks/LockView';

import requireAuthentication from './utils/requireAuthentication';

export default(
  <Switch>
    <Route exact path="/" component={RegisterView} />
    <Route path="/home" component={HomeView} />
    <Route path="/upload" component={requireAuthentication(UploadView)} />
    <Route path="/locks" component={requireAuthentication(LocksView)} />
    <Route path="/lock/:id" component={requireAuthentication(LockView)} />
    <Route path="/login" component={LoginView} />
    <Route path="/protected" component={requireAuthentication(ProtectedView)} />
    <Route path="*" component={NotFoundView} />
  </Switch>

);
