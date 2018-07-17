import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_HOST;

const isProdPort = (p) => p === '80' || p === '';

const apiPort = isProdPort(process.env.REACT_APP_API_PORT) ?
  '' : `:${process.env.REACT_APP_API_PORT}`;


const baseApi = apiUrl + apiPort;

export const get = async (endpoint) => {
  const requestUrl = `${baseApi}/${endpoint}/`;

  try {
    return await axios.get(requestUrl);
  } catch (err) {
    const { data: error } = err && err.response;
    throw new Error(error);
  }
}
