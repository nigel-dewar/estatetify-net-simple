import { IImage } from './../models/profile';
import { IActivity } from './../models/activity';
import { IUser, IUserFormValues } from './../models/user';
import { v4 as uuid } from "uuid";
import { history } from '../..';
import { IProperty } from './../models/property';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IProfile } from '../models/profile';

axios.defaults.baseURL = 'http://localhost:5001/api';

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
  
  if (error.message === 'Network Error' && !error.response){
    toast.error('Network error!');
  }
  const {status, data, config} = error.response;
  if (status === 404){
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')){
    history.push('/notfound')
  }
  if (status === 500){
    toast.error('Server error - check the terminal for more info!')
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const sleepAmount: number = 1000;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(sleepAmount))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(sleepAmount))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(sleepAmount))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(sleepAmount))
      .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    let fileName = `${uuid()}.jpeg`;
    formData.append("File", file, fileName);
    return axios.post(url, formData, {
      headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody);
  } 
};

const Properties = {
  list: (): Promise<IProperty[]> => requests.get("/properties"),
  details: (id: string): Promise<IProperty> =>
    requests.get(`/properties/${id}`),
  create: (property: IProperty): Promise<IProperty> =>
    requests.post(`/properties`, property),
  update: (property: IProperty): Promise<IProperty> =>
    requests.put(`/properties/${property.id}`, property),
  delete: (id: string) => requests.del(`/properties/${id}`),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user)
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IImage> =>
    requests.postForm(`/user/addimage`, photo),
  setMainPhoto: (id: string) => requests.post(`/user/setmain/${id}`, {}),
  deletePhoto: (id: string) => requests.del(`/user/deleteimage/${id}`),
};

export default {
    Properties,
    Activities,
    User,
    Profiles
}