import React, { useEffect, useState } from 'react';
import GeolocationList from '../../components/geolocation-list/GeolocationList';
import GeolocationSearch, { FormValue } from '../../components/geolocation-search/GeolocationSearch';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../states/Loader';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { GeolocationSearchResult } from '../../interfaces/geolocation.interface';
import { DisplayParams } from '../../interfaces/search-result.interface';
import { omitBy } from 'lodash';

interface SearchParams extends FormValue, DisplayParams {}

const Geolocations = () => {
  const history = useHistory();
  const setLoader = useSetRecoilState(loaderState);
  const [searchParams, setSearchParams] = useState<SearchParams>({pageNumber: 1, itemsPerPage: 1});
  const [searchResult, setSearchResult] = useState<GeolocationSearchResult | null>(null);

  const getSearchParams = (incommingParams: SearchParams) => {
    const updatedParams = {...searchParams, ...incommingParams};
    if (!incommingParams.pageNumber) {
      updatedParams.pageNumber = 1;
    }
    const cleanedParams = omitBy(updatedParams, (value) => !value);
    setSearchParams(cleanedParams);
  };

  const goToGeolocationCreation = () => {
    history.push('/geolocations/new');
  };
  
  useEffect(() => {
    setLoader(true);
    axios.get('/api/geolocations', { params: searchParams })
      .then(geolocations => {
        setSearchResult(geolocations.data.result);
        setLoader(false);
      });
  }, [searchParams, setLoader]);
  
  return (
    <Container>
      <h1>Search for geolocation</h1>
      <div className="mb-3">
        <GeolocationSearch perform={getSearchParams} />
      </div>
      <GeolocationList searchResult={searchResult} pageChanged={getSearchParams} />
      <div className="float-right">
        <Button onClick={() => goToGeolocationCreation()}>Add new geolocation</Button>
      </div>
    </Container>
  );
}

export default Geolocations;
