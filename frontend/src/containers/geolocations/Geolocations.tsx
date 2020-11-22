import React, { useEffect, useState } from 'react';
import GeolocationList from '../../components/geolocation-list/GeolocationList';
import GeolocationSearch from '../../components/geolocation-search/GeolocationSearch';
import axios from 'axios';

const Geolocations = () => {
  const [searchParams, setSearchParams] = useState({});
  const [geolocations, setGeolocations] = useState([]);

  useEffect(() => {
    axios.get('/api/geolocations', { params: {} })
      .then(geolocations => {
        setGeolocations(geolocations.data.result);
      });
  }, [searchParams]);
  
  return (
    <>  
      <GeolocationSearch perform={setSearchParams} />
      <GeolocationList />
    </>
  );
}

export default Geolocations;
