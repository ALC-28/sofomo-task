import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { GeolocationSearchResult } from '../../interfaces/geolocation.interface';

interface Props {
  searchResult: GeolocationSearchResult | null;
  pageChanged: (event: {pageNumber: number}) => void;
}

function GeolocationList(props: Props) {
  const history = useHistory();
  const [paginationItems, setPaginationItems] = useState<any[]>([]);

  useEffect(() => {
    const getPaginationItems = (searchResult: GeolocationSearchResult | null) => {
      return searchResult 
        ? new Array(searchResult.displayParams.totalPages).fill(null)
          .map((page, index) => 
            <Pagination.Item 
              key={index+1} 
              active={index+1 === searchResult.displayParams.pageNumber}
              onClick={() => props.pageChanged({pageNumber: index+1})}
            >
              {index+1}
            </Pagination.Item>
          ) 
        : [];
    };
    const paginationItems = getPaginationItems(props.searchResult);
    setPaginationItems(paginationItems);
  }, [props])

  const goToDetails = (geolocationId: string) => {
    history.push(`/geolocations/${geolocationId}`);
  };

  return (<>
    <Pagination className="float-right">{paginationItems}</Pagination>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>IP</th>
          <th>City</th>
          <th>Country</th>
          <th>Comment</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.searchResult ? props.searchResult.content.map((item, index) => <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.ip}</td>
          <td>{item.city}</td>
          <td>{item.country_name}</td>
          <td>{item.comment}</td>
          <td><Button onClick={() => goToDetails(item._id)} className="float-right">Details</Button></td>
        </tr>) : <tr><td colSpan={6}>No items found</td></tr>}
      </tbody>
    </Table>
  </>);
}

export default GeolocationList;
