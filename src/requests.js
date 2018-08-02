import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_HOST;

const isProdPort = (p) => p === '80' || p === '';

const apiPort = isProdPort(process.env.REACT_APP_API_PORT)
  ? ''
  : `:${process.env.REACT_APP_API_PORT}`;

const baseApi = apiUrl + apiPort;

export const get = async (endpoint) => {
  const reqUrl = `${baseApi}/${endpoint}/`;

  try {
    return await axios.get(reqUrl, { withCredentials: true });
  } catch (err) {
    const { data: error } = err && err.response;
    throw new Error(error);
  }
};

export const post = async (endpoint, payload) => {
  const reqUrl = `${baseApi}/${endpoint}/`;

  try {
    return await axios.post(reqUrl, payload, { withCredentials: true });
  } catch (err) {
    const { data: error } = err && err.response;
    throw new Error(error);
  }
};
