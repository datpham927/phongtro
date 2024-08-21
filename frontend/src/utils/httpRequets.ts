import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default httpRequest;

// Add a request interceptor
httpRequest.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token =
      JSON.parse(window.localStorage.getItem("persist:root")) &&
      JSON.parse(JSON.parse(window.localStorage.getItem("persist:root")).auth)
        .token;
    config.headers = {
      token,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
