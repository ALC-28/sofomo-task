import { Formik, FormikProps } from 'formik';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';

interface Props {
  perform: (formValue: FormValue) => void;
}

export interface FormValue {
  ip?: string;
  country_name?: string;
  city?: string;
}

const schema = yup.object({
  ip: yup.string(),
  country_name: yup.string(),
  city: yup.string()
});

const GeolocationSearch: React.FC<Props> = (props: Props) => {
  const performSearch = (formValue: FormValue) => {
    props.perform(formValue);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={performSearch}
      initialValues={{ip: '', country_name: '', city: ''}}
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
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Country name</Form.Label>
              <Form.Control
                type="text"
                name="country_name"
                value={props.values.country_name}
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={props.values.city}
                onChange={props.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col>
              <div className="float-right">
                <Button onClick={() => props.resetForm()} className="mr-3">Clear form</Button>
                <Button type="submit">Search</Button>
              </div>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default GeolocationSearch;
