import {default as axios} from 'axios';
// import {REACT_APP_API_URL as API_URL} from '@env';

const http = (token = null) => {
  const headers = token && {
    authorization: `Bearer ${token}`,
  };
  return axios.create({
    baseURL: 'http://103.55.36.203:5000/',
    headers,
  });
};

export default http;
