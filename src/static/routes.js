import React from 'react';
import { Route, Switch } from 'react-router';
import LockView from './containers/Locks/LockView';
import CreateView from './containers/Locks/CreateView';
import InviteView from './containers/Locks/InviteView';
import {
  LoginView,
  HomeView,
  ProtectedView,
  NotFoundView,
  RegisterView,
  UploadView,
  LocksView,
  SettingsView,
} from './containers';

import requireAuthentication from './utils/requireAuthentication';

export default(
  <Switch>
    <Route exact path="/" component={RegisterView} />
    <Route path="/home" component={HomeView} />
    <Route path="/upload" component={requireAuthentication(UploadView)} />
    <Route path="/locks" component={requireAuthentication(LocksView)} />
    <Route path="/lock/new" component={requireAuthentication(CreateView)} />
    <Route path="/lock/:id/invite" component={requireAuthentication(InviteView)} />
    <Route path="/lock/:id" component={requireAuthentication(LockView)} />
    <Route path="/settings" component={requireAuthentication(SettingsView)} />
    <Route path="/login" component={LoginView} />
    <Route path="/protected" component={requireAuthentication(ProtectedView)} />
    <Route path="*" component={NotFoundView} />
  </Switch>

);
