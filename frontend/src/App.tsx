import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState } from 'recoil';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { messageState } from './states/Message';
import {IntlProvider, FormattedMessage } from 'react-intl';
import { english } from './messages';
import styles from './App.module.css';
import { useRecoilValue } from 'recoil';
import { userState } from './states/User';
import interceptor from './interceptor';
import { loaderState } from './states/Loader';
import classNames from 'classnames';

const GeolocationDetails = lazy(() => import('./containers/geolocation-details/GeolocationDetails'));
const GeolocationCreation = lazy(() => import('./containers/geolocation-creation/GeolocationCreation'));
const Geolocations = lazy(() => import('./containers/geolocations/Geolocations'));
const Login = lazy(() => import('./containers/login/Login'));
const NotFound = lazy(() => import('./containers/not-found/NotFound'));
const Register = lazy(() => import('./containers/register/Register'));

const App = () => {
  const [message, setMessage] = useRecoilState(messageState);
  const isLoaderActive = useRecoilValue(loaderState);
  const loggedInUser = useRecoilValue(userState);
  if (!!loggedInUser) {
    interceptor(loggedInUser.token, setMessage);
  }
  const classSelector = classNames.bind(styles);

  return (
    <BrowserRouter>
      <IntlProvider messages={english} locale="en">
        <div>
          <Header />
          {isLoaderActive && <Spinner animation="border" variant="primary" className={styles.spinner} />}
          <Suspense fallback={<Spinner animation="border" variant="primary" className={styles.spinner} />}>
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path='/geolocations' component={Geolocations} />
              <ProtectedRoute exact path="/geolocations/new" component={GeolocationCreation} />
              <ProtectedRoute exact path="/geolocations/:id" component={GeolocationDetails} />
              <ProtectedRoute exact path="/geolocations/:id/edit" component={GeolocationDetails} />
              <ProtectedRoute exact path="/register" component={Register} />
              <Route exact path="/unauthorized" component={NotFound} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Suspense>
          {message && <Toast show={!!message} animation={false} onClose={() => setMessage('')} className={styles.toast}>
            <Toast.Header className={message.startsWith('ERROR_') ? styles.error : styles.success}>
              <strong className="mr-auto">
                {message.startsWith('ERROR_') ? 'Error' : 'Success'}
              </strong>
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
