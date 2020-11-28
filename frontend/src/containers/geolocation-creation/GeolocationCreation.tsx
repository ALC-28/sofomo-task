import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Formik, FormikProps } from 'formik';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../../states/Loader';
import { GeolocationInterface } from '../../interfaces/geolocation.interface';

interface RouteParams {
  id: string;
}

interface FormValue {
  ip: string;
  comment: string;
}

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

const schema = yup.object({
  ip: yup.string().required(),
  comment: yup.string()
});

function GeolocationCreation() {
  const { id }: RouteParams = useParams();
  const history = useHistory();
  const setLoader = useSetRecoilState(loaderState);
  const [geolocation, setGeolocation] = useState<GeolocationInterface | null>(null);

  const setCurrentGeolocation = async (props: FormikProps<FormValue>) => {
    setLoader(true);
    const result = await axios.get('/api/ipstack/own');
    const current = result.data.result;
    setGeolocation(current);
    props.setFieldValue('ip', current.ip);
    setLoader(false);
  };

  const previewGeolocation = async (ip: string) => {
    setLoader(true);
    const result = await axios.get(`/api/ipstack/custom/${ip}`);
    const current = result.data.result;
    setGeolocation(current);
    setLoader(false);
  };

  const saveGeolocation = async (formValue: FormValue) => {
    const payload = {...geolocation, comment: formValue.comment};
    await axios.post('/api/geolocations', payload);
    history.push('/geolocations');
  };

  const goBack = () => {
    history.push('/geolocations');
  };
  
  return (
    <Container>
      <h1>Create geolocation</h1>
      <div className="mb-3">
        <Formik
          validationSchema={schema}
          onSubmit={saveGeolocation}
          initialValues={{ip: '', comment: ''}}
        >
          {(props: FormikProps<FormValue>) => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>IP</Form.Label>
                  <Form.Control
                    type="text"
                    name="ip"
                    value={props.values.ip}
                    onChange={props.handleChange}
                    isInvalid={!!props.touched.ip && !!props.errors.ip}
                  />
                  <Form.Control.Feedback type="invalid">Geolocation is invalid</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    name="comment"
                    value={props.values.comment}
                    onChange={props.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Col>
                  <div className="float-right">
                    <Button onClick={() => setCurrentGeolocation(props)} className="mr-3">Set current geolocation</Button>
                    <Button 
                      disabled={!props.values.ip} 
                      onClick={() => previewGeolocation(props.values.ip)} 
                      className="mr-3"
                    >Preview geolocation</Button>
                    <Button 
                      type="submit"
                      disabled={!geolocation} 
                    >Save geolocation</Button>
                  </div>
                </Col>
              </Form.Row>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mb-3">
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
      </div>
      <div className="float-right">
        <Button onClick={() => goBack()}>Go back to geolocation list</Button>
      </div>
    </Container>
  );
}

export default GeolocationCreation;
