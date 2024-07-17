const { default: axios } = require("axios");


export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 5000,
    header: {
      'ContentType': 'program/json',
    },
  });