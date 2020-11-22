import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../../states/User';
import axios from 'axios';

function Login() {
  const [user, setUser] = useRecoilState(userState);
  
  const login = () => {
    axios.post('/api/auth/login', { })
      .then(user => {
        setUser(user.data.result);
      });
  };

  return (
    <div>
      <h1>Login {JSON.stringify(user)}</h1>
      <button type="button" onClick={() => login()}>Login</button>
    </div>
  );
}

export default Login;
