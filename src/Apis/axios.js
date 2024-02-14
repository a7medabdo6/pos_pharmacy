import { REACT_APP_BASEURL } from '@/config/constants';
import axios from 'axios';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const headers = {
  ...(token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {}),
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  bussniesid: '1',
};
if (user && user?.tenant?.busisness_name && user?.role != 1) {
  headers.bussniesid = 1;
}

export const api = axios.create({
  baseURL: REACT_APP_BASEURL,
  headers: { ...headers },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );
