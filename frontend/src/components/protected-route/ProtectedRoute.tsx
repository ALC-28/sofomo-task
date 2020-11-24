import React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/User";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const user = useRecoilValue(userState);
  return (
    <Route {...rest} render={props => (
      user 
        ? <Component {...rest} {...props} /> 
        : <Redirect to={{ pathname: '/unauthorized', state: { from: props.location }}} />   
    )} />
  );
};

export default ProtectedRoute;