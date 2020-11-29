import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function NotAuthorized() {
  const history = useHistory();

  const goToLoginScreen = () => {
    history.push('/');
  };

  return (
    <Container className="justify-content-md-center mt-3 text-center">
      <h1>You're not authorized to view this page.</h1>
      <Button variant="link" onClick={() => goToLoginScreen()}>Go to login screen</Button>
    </Container>
  );
}

export default NotAuthorized;
