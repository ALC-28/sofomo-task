import axios from 'axios';

const interceptor = (userToken: string | null, setMessage: any = null) => {
  axios.interceptors.request.use(
    (conf) => {
      if (userToken) {
        conf.headers['Authorization'] = `Bearer ${userToken}`;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      if (next.data.message) {
        setMessage(next.data.message);
      }
      return Promise.resolve(next);
    },
    (error) => {
      if (error.response) {
        setMessage(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );
};

export default interceptor;
