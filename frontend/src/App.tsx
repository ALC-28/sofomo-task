import React, { lazy, Suspense, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import JWTDecode from 'jwt-decode';
import interceptor from './interceptor';
import { User, userState } from './states/User';
import Toast from 'react-bootstrap/Toast';
import { errorState } from './states/Error';
import {IntlProvider, FormattedMessage } from 'react-intl';
import { english } from './messages';

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationEdit = lazy(() => import('./containers/geolocation-edit/GeolocationEdit'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const getLoggedInUser = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    const user = {...JWTDecode(userToken) as Partial<User>, token: userToken};
    const currentTime = new Date().getTime() / 1000;
    return user.exp as number > currentTime ? user : null;
  }
};

const App = () => {
  const [error, setError] = useRecoilState(errorState); 
  const loggedInUser = getLoggedInUser();
  const setUser = useSetRecoilState(userState);
  if (loggedInUser) {
    interceptor(loggedInUser.token);
  }
  
  useEffect(() => {
    setUser(loggedInUser);
  }, [loggedInUser, setUser])

  return (
    <BrowserRouter>
      <IntlProvider messages={english} locale="en">
        <div>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path='/geolocations' component={Geolocations} isAuthenticated={!!loggedInUser} />
              <ProtectedRoute exact path="/geolocation/:id" component={GeolocationDetails} isAuthenticated={!!loggedInUser} />
              <ProtectedRoute exact path="/geolocation/:id/edit" component={GeolocationEdit} isAuthenticated={!!loggedInUser} />
              <ProtectedRoute exact path="/register" component={Register} isAuthenticated={!!loggedInUser} />
              <Route exact path="/unauthorized" component={NotFound} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Suspense>
          {error && <Toast show={!!error} animation={false} onClose={() => setError('')} style={{
            position: 'absolute',
            top: '10%',
            left: 0,
            right: 0,
            margin: '0 auto'
          }}>
            <Toast.Header>
              <strong className="mr-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>
              <FormattedMessage id={error} />
            </Toast.Body>
          </Toast>}
        </div>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
