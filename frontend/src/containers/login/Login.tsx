import React from 'react';
import { useSetRecoilState} from 'recoil';
import { userState } from '../../states/User';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import interceptor from '../../interceptor';
import { messageState } from '../../states/Message';

interface FormValue {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

function Login() {
  const setMessage = useSetRecoilState(messageState);

  const history = useHistory();
  
  const setUser = useSetRecoilState(userState);
  
  const login = async (formValue: FormValue) => {
    interceptor(null, setMessage);
    const user = await axios.post('/api/auth/login', formValue);
    setUser(user.data.result);
    interceptor(user.data.result.token, setMessage);
    history.push("/geolocations");
  };

  return (
    <div>
      <h1 className={styles.test}>Login</h1>
      <Formik
        validationSchema={schema}
        onSubmit={login}
        initialValues={{email: '', password: ''}}
      >
        {(props: FormikProps<FormValue>) => (
          <Form noValidate onSubmit={props.handleSubmit}>
            <Form.Row>
              <Form.Group controlId="F01">
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
              <Form.Group controlId="F02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  isInvalid={!!props.touched.password && !!props.errors.password}
                />
                <Form.Control.Feedback type="invalid">Password is invalid</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>     
    </div>
  );
}

export default Login;
