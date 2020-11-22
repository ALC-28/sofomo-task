import React from 'react';
import { Link } from 'react-router-dom';

function GeolocationDetails() {
  return (
    <div>
      <h1>GeolocationDetails</h1>
      <Link to="/geolocation/:id/edit">Edit</Link>
    </div>
  );
}

export default GeolocationDetails;
