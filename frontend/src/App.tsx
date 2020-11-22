import React, { lazy, Suspense } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationEdit = lazy(() => import('./containers/geolocation-edit/GeolocationEdit'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <div>
        <header>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/geolocations">Geolocations</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/geolocations" component={Geolocations} />
            <Route path="/geolocation/:id" component={GeolocationDetails} />
            <Route path="/geolocation/:id/edit" component={GeolocationEdit} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
