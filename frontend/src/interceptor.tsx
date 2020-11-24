import axios from 'axios';

const interceptor = (userToken: string | null) => {
  axios.interceptors.request.use(
    (conf) => {
      conf.headers['Authorization'] = `Bearer ${userToken}`;
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      console.log('handling response message', next);
      return Promise.resolve(next);
    },
    (error) => {
      console.log('handling response error', error.response.data.code);
      return Promise.reject(error);
    }
  );
};

export default interceptor;
