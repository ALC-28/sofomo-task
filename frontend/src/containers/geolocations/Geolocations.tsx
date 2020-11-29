import React, { useEffect, useState } from 'react';
import GeolocationList from '../../components/geolocation-list/GeolocationList';
import GeolocationSearch, { FormValue } from '../../components/geolocation-search/GeolocationSearch';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../states/Loader';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { GeolocationInterface } from '../../interfaces/geolocation.interface';

const Geolocations = () => {
  const history = useHistory();
  const setLoader = useSetRecoilState(loaderState);
  const [searchParams, setSearchParams] = useState<FormValue>({});
  const [geolocations, setGeolocations] = useState<GeolocationInterface[]>([]);

  const goToGeolocationCreation = () => {
    history.push('/geolocations/new');
  };
  
  useEffect(() => {
    setLoader(true);
    axios.get('/api/geolocations', { params: searchParams })
      .then(geolocations => {
        setGeolocations(geolocations.data.result);
        setLoader(false);
      });
  }, [searchParams, setLoader]);
  
  return (
    <Container>
      <h1>Search for geolocation</h1>
      <div className="mb-3">
        <GeolocationSearch perform={setSearchParams} />
      </div>
      <GeolocationList items={geolocations} />
      <div className="float-right">
        <Button onClick={() => goToGeolocationCreation()}>Add new geolocation</Button>
      </div>
    </Container>
  );
}

export default Geolocations;
