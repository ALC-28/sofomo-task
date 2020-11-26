import React, { useEffect, useState } from 'react';
import GeolocationList from '../../components/geolocation-list/GeolocationList';
import GeolocationSearch from '../../components/geolocation-search/GeolocationSearch';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../states/Loader';

const Geolocations = () => {
  const setLoader = useSetRecoilState(loaderState);
  const [searchParams, setSearchParams] = useState({});
  const [geolocations, setGeolocations] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios.get('/api/geolocations', { params: {} })
      .then(geolocations => {
        setGeolocations(geolocations.data.result);
        setLoader(false);
      });
  }, [searchParams, setLoader]);
  
  return (
    <>  
      <GeolocationSearch perform={setSearchParams} />
      <GeolocationList />
    </>
  );
}

export default Geolocations;
