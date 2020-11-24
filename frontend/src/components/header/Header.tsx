import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/User';

const Header = () => {
  const history = useHistory();

  const user = useRecoilValue(userState);

  const unsetUser = useSetRecoilState(userState)

  const logout = () => {
    unsetUser(null);
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
