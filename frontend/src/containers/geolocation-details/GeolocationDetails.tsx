import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { GeolocationInterface } from '../../interfaces/geolocation.interface';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../states/Loader';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface RouteParams {
  id: string;
}

interface FormValue {
  comment: string;
}

const schema = yup.object({
  comment: yup.string().required()
});

const geolocationPropsDisplay = [
  {field: 'ip', label: 'IP'},
  {field: 'latitude', label: 'Latitude'},
  {field: 'longitude', label: 'Longitude'},
  {field: 'zip', label: 'Zip'},
  {field: 'city', label: 'City'},
  {field: 'region_name', label: 'Region name'},
  {field: 'country_name', label: 'Country name'},
  {field: 'continent_name', label: 'Continent name'}
];

function GeolocationDetails() {
  const history = useHistory();
  const location = useLocation();
  const isEditable = location.pathname.split('/').pop() === 'edit';
  const { id }: RouteParams = useParams();
  const setLoader = useSetRecoilState(loaderState);
  const [geolocation, setGeolocation] = useState<GeolocationInterface | null>(null);

  const goToEditing = (geolocationId: string) => {
    history.push(`/geolocations/${geolocationId}/edit`);
  };

  const deleteGeolocation = async (geolocationId: string) => {
    await axios.delete(`/api/geolocations/${geolocationId}`);
    history.push(`/geolocations`);
  };

  const goBack = () => {
    history.push('/geolocations');
  };

  const saveGeolocation = async (formValue: FormValue) => {
    const payload = {...geolocation, ...formValue};
    await axios.put(`/api/geolocations/${id}`, payload);
    history.push(`/geolocations/${id}`);
  };

  useEffect(() => {
    setLoader(true);
    axios.get(`/api/geolocations/${id}`).then(response => {
      setGeolocation(response.data.result);
      setLoader(false);
    })
  }, [location, id, setLoader])

  return (
    <Container>
      <h1>Geolocation {isEditable ? 'editing' : 'details'}</h1>
      <Row className="mb-3">
        <Col>
          {geolocation && <ListGroup horizontal>
            <ListGroup variant="flush">
              {geolocationPropsDisplay.map((prop, index) => <ListGroup.Item key={index}>{prop.label}</ListGroup.Item>)}
            </ListGroup>
            <ListGroup variant="flush">
              {geolocationPropsDisplay.map((prop, index) => 
                <ListGroup.Item key={index} className="font-weight-bold">{geolocation[prop.field as keyof GeolocationInterface]}</ListGroup.Item>
              )}
            </ListGroup>
          </ListGroup>}
        </Col>
        <Col>
          {geolocation && isEditable && <Formik
            validationSchema={schema}
            onSubmit={saveGeolocation}
            initialValues={{comment: geolocation?.comment || ''}}
          >
            {(props: FormikProps<FormValue>) => (
              <Form noValidate onSubmit={props.handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      type="text"
                      name="comment"
                      value={props.values.comment}
                      onChange={props.handleChange}
                      isInvalid={!!props.touched.comment && !!props.errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">Comment is required</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <div className="float-right">
                      <Button type="submit">Save</Button>
                    </div>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Formik>}
            {geolocation && !isEditable && <>Comment<p className="font-weight-bold">{geolocation.comment}</p></>}
        </Col>
      </Row>
      <div className="float-right">
        {!isEditable && <>
          <Button variant="danger" onClick={() => deleteGeolocation(id)} className="mr-3">Delete permanently</Button>
          <Button onClick={() => goToEditing(id)} className="mr-3">Edit</Button>
        </>}
        <Button onClick={() => goBack()}>Go back to geolocation list</Button>
      </div>
    </Container>
  );
}

export default GeolocationDetails;
