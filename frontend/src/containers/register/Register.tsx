import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik, FormikHelpers, FormikProps } from 'formik';

interface FormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmed: string;
}

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20) ,
  passwordConfirmed: yup.string().required().test('password-match', 'Passwords don\'t match', function (value) {
    return this.parent.password === value;
  })
});

function Register() {

  const registerUser = async (formValue: FormValue, helpers: FormikHelpers<FormValue>) => {
    await axios.post('/api/auth/register', formValue);
    helpers.resetForm();
  };

  return (
    <Container>
      <h1>Register new user</h1>
      <Formik
        validationSchema={schema}
        onSubmit={registerUser}
        initialValues={{firstName: '', lastName: '', email: '', password: '', passwordConfirmed: ''}}
      >
        {(props: FormikProps<FormValue>) => (
          <Form noValidate onSubmit={props.handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={props.values.firstName}
                onChange={props.handleChange}
                isInvalid={!!props.touched.firstName && !!props.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={props.values.lastName}
                onChange={props.handleChange}
                isInvalid={!!props.touched.lastName && !!props.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={props.values.email}
                onChange={props.handleChange}
                isInvalid={!!props.touched.email && !!props.errors.email}
              />
              <Form.Control.Feedback type="invalid">Email is invalid</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={props.values.password}
                onChange={props.handleChange}
                isInvalid={!!props.touched.password && !!props.errors.password}
              />
              <Form.Text className="text-muted">
                Password must contain 8-20 characters
              </Form.Text>
              <Form.Control.Feedback type="invalid">Password is invalid</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmed"
                value={props.values.passwordConfirmed}
                onChange={props.handleChange}
                isInvalid={!!props.touched.passwordConfirmed && !!props.errors.passwordConfirmed}
              />
              <Form.Control.Feedback type="invalid">Passwords don't match</Form.Control.Feedback>
            </Form.Group>
            <div className="float-right">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>     
    </Container>
  );
}

export default Register;
