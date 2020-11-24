import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/User';

const Header = () => {
  const history = useHistory();

  const user = useRecoilValue(userState);

  const unsetUser = useResetRecoilState(userState)

  const logout = () => {
    unsetUser();
    history.push("/");
  };

  return (
    <>
      {user && <div>
        <button type="button" onClick={() => logout()}>Logout</button>
        <ul>
          <li>
            User: {JSON.stringify(user)}
          </li>
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
      </div>}
    </>
  );
};

export default Header;
