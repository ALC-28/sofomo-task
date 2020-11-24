import React, { lazy, Suspense } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/header/Header';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationEdit = lazy(() => import('./containers/geolocation-edit/GeolocationEdit'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path='/geolocations' component={Geolocations} />
              <ProtectedRoute exact path="/geolocation/:id" component={GeolocationDetails} />
              <ProtectedRoute exact path="/geolocation/:id/edit" component={GeolocationEdit} />
              <ProtectedRoute exact path="/register" component={Register} />
              <Route exact path="/unauthorized" component={NotFound} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
