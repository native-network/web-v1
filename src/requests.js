import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_HOST;

const isProdPort = (p) => p === '80' || p === '';

const apiPort = isProdPort(process.env.REACT_APP_API_PORT)
  ? ''
  : `:${process.env.REACT_APP_API_PORT}`;

const baseURL = apiUrl + apiPort;

export const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export const s3Path = (fileName) => {
  return `${baseURL}/s3uploader/uploads/${fileName}`;
};

export const get = async (endpoint) => {
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};

export const post = async (endpoint, payload) => {
  try {
    return await instance.post(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};

export const put = async (endpoint, payload) => {
  try {
    return await instance.put(`/${endpoint}`, payload);
  } catch (err) {
    throw new Error(err);
  }
};
