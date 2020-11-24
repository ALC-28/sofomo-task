import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import interceptor from './interceptor';
import JWTDecode from 'jwt-decode';
import { User, userState } from './states/User';
import { useSetRecoilState } from 'recoil';

const getLoggedInUser = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    const user = {...JWTDecode(userToken) as Partial<User>, token: userToken};
    const currentTime = new Date().getTime() / 1000;
    return user.exp as number > currentTime ? user : null;
  }
};

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationEdit = lazy(() => import('./containers/geolocation-edit/GeolocationEdit'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const App = () => {
  const loggedInUser = getLoggedInUser();
  const setUser = useSetRecoilState(userState);
  setUser(loggedInUser);
  if (loggedInUser) {
    interceptor(loggedInUser.token);
  }
  return (
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
  );
};

export default App;
