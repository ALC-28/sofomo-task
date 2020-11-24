import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../states/User';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  
  const setUser = useSetRecoilState(userState);
  
  const login = () => {
    axios.post('/api/auth/login', { })
      .then(user => {
        setUser(user.data.result);
        history.push("/geolocations");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={() => login()}>Login</button>
    </div>
  );
}

export default Login;
