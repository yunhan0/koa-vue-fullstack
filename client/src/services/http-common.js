/*
 * Axios is the most popular HTTP Client library,
 * by the time of writing this piece of code.
 */
import axios from 'axios';

// A new instance of axios with a custom config.
export const HTTP = axios.create({
  baseURL: 'http://localhost:3000/api/'
})