import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isAuthenticated 
        ? <Component {...rest} {...props} /> 
        : <Redirect to={{ pathname: '/unauthorized', state: { from: props.location }}} />   
    )} />
  );
};

export default ProtectedRoute;