import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  const goToGeolocationScreen = () => {
    history.push('/geolocations');
  };

  return (
    <Container className="justify-content-md-center mt-3 text-center">
      <h1>The page you're trying to view does not exist.</h1>
      <Button variant="link" onClick={() => goToGeolocationScreen()}>Go to geolocation screen</Button>
    </Container>
  );
}

export default NotFound;
