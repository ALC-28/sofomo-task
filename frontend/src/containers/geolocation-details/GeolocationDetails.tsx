import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

function GeolocationDetails() {
  const history = useHistory();
  const { id }: RouteParams = useParams();

  const goToEditing = (geolocationId: string) => {
    history.push(`/geolocations/${geolocationId}/edit`);
  };

  return (
    <div>
      <h1>GeolocationDetails</h1>
      <Button onClick={() => goToEditing(id)} className="float-right">Edit</Button>
    </div>
  );
}

export default GeolocationDetails;
