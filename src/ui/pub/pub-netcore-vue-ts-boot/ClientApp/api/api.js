import axios from 'axios';
var ROOT_URL = 'http://localhost:5000';
export var fetchFilters = function () {
    return axios.get(ROOT_URL + "/api/filters", {
        headers: {},
    });
};
export var fetchProperty = function (slugAndListingId) {
    return axios.get(ROOT_URL + "/api/properties/GetProperty/" + slugAndListingId, {});
};
export var fetchPropertyDescription = function (slug) {
    return axios.get(ROOT_URL + "/api/properties/GetPropertyDesc/" + slug, {});
};
export var fetchPropertyImages = function (propertyId) {
    // console.log(propertyId);
    return axios.get(ROOT_URL + "/api/properties/GetPropertyImages/" + propertyId, {});
};
export var fetchPropertyImageForThumbnail = function (thumbnailId) {
    // console.log(propertyId);
    return axios.get(ROOT_URL + "/api/properties/GetPropertyImage/" + thumbnailId, {});
};
export var fetchOneProperty = function () {
    return axios.get(ROOT_URL + "/api/values", {
        headers: {},
    });
};
export var fetchProperties = function (apiUrl, query) {
    return axios.get(apiUrl + "/api/properties", {
        params: query,
        headers: {},
    });
    // return axios.get(`${ROOT_URL}/api/properties`, { params: query }).then(response => {
    // });
};
export var searchSuburbs = function (query) {
    var queryBody = {
        query: query,
    };
    return axios.post(ROOT_URL + "/api/postcodes/search", queryBody);
    // return axios.post(`${ROOT_URL}/api/postcodes/search`, query)
    // .then(response => {
    //     resolve(response.data);
    // })
    // .catch(error => {
    //     console.log(JSON.stringify(error))
    //     //reject(error.response);
    // });
};
export var fetchSuburbBySlug = function (query) {
    var queryBody = {
        query: query,
    };
    return axios.post(ROOT_URL + "/api/postcodes/searchBySlug", queryBody);
};
export default {
    fetchOneProperty: fetchOneProperty,
    fetchFilters: fetchFilters,
    fetchProperties: fetchProperties,
    fetchProperty: fetchProperty,
    fetchPropertyDescription: fetchPropertyDescription,
    searchSuburbs: searchSuburbs,
    fetchSuburbBySlug: fetchSuburbBySlug,
    fetchPropertyImages: fetchPropertyImages,
    fetchPropertyImageForThumbnail: fetchPropertyImageForThumbnail,
};
//# sourceMappingURL=api.js.map