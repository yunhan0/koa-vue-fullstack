/*
 * Axios is the most popular HTTP Client library,
 * by the time of writing this piece of code.
 */
import axios from 'axios';

// A new instance of axios with a custom config.
let HTTP = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

// Add a request interceptor
HTTP.interceptors.request.use(function (config) {
    if (localStorage.getItem('token') !== null) {
        config.headers.common['access_token'] = localStorage.getItem('token');
    }
    return config;
});

// Add a response interceptor


export default HTTP;