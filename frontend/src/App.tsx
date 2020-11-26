import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState } from 'recoil';
import Toast from 'react-bootstrap/Toast';
import { messageState } from './states/Message';
import {IntlProvider, FormattedMessage } from 'react-intl';
import { english } from './messages';
import styles from './App.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from './states/User';
import interceptor from './interceptor';

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationEdit = lazy(() => import('./containers/geolocation-edit/GeolocationEdit'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const App = () => {
  const [message, setMessage] = useRecoilState(messageState); 
  const loggedInUser = useRecoilValue(userState);
  if (!!loggedInUser) {
    interceptor(loggedInUser.token);
  }

  return (
    <BrowserRouter>
      <IntlProvider messages={english} locale="en">
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
          {message && <Toast show={!!message} animation={false} onClose={() => setMessage('')} className={styles.toast}>
            <Toast.Header>
              <strong className="mr-auto">{message.startsWith('ERROR_') ? 'Error' : 'Success'}</strong>
            </Toast.Header>
            <Toast.Body>
              <FormattedMessage id={message} />
            </Toast.Body>
          </Toast>}
        </div>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
