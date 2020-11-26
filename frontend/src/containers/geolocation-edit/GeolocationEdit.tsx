import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

function GeolocationEdit() {
  const { id }: RouteParams = useParams();

  return (
    <div>
      <h1>{id ? 'GeolocationEdit' : 'GeolocationNew'}</h1>
    </div>
  );
}

export default GeolocationEdit;
