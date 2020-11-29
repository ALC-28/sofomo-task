import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/User';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { User } from '../../interfaces/user.interface';

const Header = () => {
  const history = useHistory();
  const user = useRecoilValue<User>(userState);
  const unsetUser = useSetRecoilState(userState)

  const logout: () => void = () => {
    unsetUser(null);
    history.push("/");
  };

  return (
    <>
      {user && <Navbar bg="light" variant="light" className="mb-3">
        <Navbar.Brand>Sofofo task</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/geolocations">Geolocations</Nav.Link>
          <Nav.Link href="/register">Register new user</Nav.Link>
        </Nav>
        <Navbar.Text className="justify-content-end">
          Signed in as: {user.firstName} 
          <Button variant="link" onClick={() => logout()}>logout</Button>
        </Navbar.Text>
      </Navbar>}
    </>
  );
};

export default Header;