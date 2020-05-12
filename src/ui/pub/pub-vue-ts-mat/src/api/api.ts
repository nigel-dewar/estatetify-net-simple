import axios from 'axios';
import { Constants } from '@/constants';

const ROOT_URL = Constants.apiUrl;

export const fetchFilters = () => {
  return axios.get(`${ROOT_URL}/api/filters`, {
    headers: {},
  });
};

export const fetchProperty = (slugAndListingId: any) => {
  return axios.get(
    `${ROOT_URL}/api/properties/slug/${slugAndListingId}`,
    {}
  );
};

export const fetchPropertyById = (propertyId: any) => {
  return axios.get(
    `${ROOT_URL}/api/properties/${propertyId}`,
    {}
  );
};



export const fetchPropertyDescription = (slug: any) => {
  return axios.get(`${ROOT_URL}/api/properties/GetPropertyDesc/${slug}`, {});
};

export const fetchPropertyImages = (propertyId: any) => {
  // console.log(propertyId);
  return axios.get(
    `${ROOT_URL}/api/properties/GetPropertyImages/${propertyId}`,
    {}
  );
};

export const fetchPropertyImageForThumbnail = (thumbnailId: any) => {
  // console.log(propertyId);
  return axios.get(
    `${ROOT_URL}/api/properties/GetPropertyImage/${thumbnailId}`,
    {}
  );
};

export const fetchOneProperty = () => {
  return axios.get(`${ROOT_URL}/api/values`, {
    headers: {},
  });
};

export const fetchProperties = (query: any) => {
  return axios.get(`${ROOT_URL}/api/properties/find`, {
    params: query,
    headers: {},
  });
  // return axios.get(`${ROOT_URL}/api/properties`, { params: query }).then(response => {
  // });
};

export const searchSuburbs = (query: any) => {
  var queryBody = {
    query: query,
  };
  return axios.post(`${ROOT_URL}/api/postcodes/FindByAny`, queryBody);
  // return axios.post(`${ROOT_URL}/api/postcodes/search`, query)
  // .then(response => {
  //     resolve(response.data);
  // })
  // .catch(error => {
  //     console.log(JSON.stringify(error))
  //     //reject(error.response);
  // });
};

export const fetchSuburbBySlug = (query: any) => {
  var queryBody = {
    query: query,
  };
  return axios.post(`${ROOT_URL}/api/postcodes/searchBySlug`, queryBody);
};

export default {
  fetchOneProperty,
  fetchFilters,
  fetchProperties,
  fetchProperty,
  fetchPropertyDescription,
  searchSuburbs,
  fetchSuburbBySlug,
  fetchPropertyImages,
  fetchPropertyImageForThumbnail,
};
