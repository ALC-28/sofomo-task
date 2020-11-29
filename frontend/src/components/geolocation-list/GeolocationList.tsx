import React from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { GeolocationInterface } from '../../interfaces/geolocation.interface';

interface Props {
  items: GeolocationInterface[];
}

const getPaginationItems = (itemsQuantity: number, activePageNumber: number) => {
  let itemsPerPage = 5;
  let pagesQuantity = itemsQuantity ? Math.ceil(itemsQuantity / itemsPerPage) : 0;
  return new Array(pagesQuantity)
    .map((page, index) => <Pagination.Item key={index+1} active={index+1 === activePageNumber}>{index+1}</Pagination.Item>);
};

function GeolocationList(props: Props) {
  const history = useHistory();
  const activePage = 1;
  let paginationItems = getPaginationItems(props.items.length, activePage);

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
        {props.items.map((item, index) => <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.ip}</td>
          <td>{item.city}</td>
          <td>{item.country_name}</td>
          <td>{item.comment}</td>
          <td><Button onClick={() => goToDetails(item._id)} className="float-right">Details</Button></td>
        </tr>)}
      </tbody>
    </Table>
  </>);
}

export default GeolocationList;
