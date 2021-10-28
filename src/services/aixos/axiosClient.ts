import axios, { AxiosError, AxiosResponse } from 'axios';
import { EToken } from '../../constants';
const baseURL = 'https://granding-system.herokuapp.com/';
const token = localStorage.getItem(EToken.loginToken);

const axiosMy = axios.create({
  baseURL: baseURL + 'api/',
  headers: {
    'content-type': 'application/json',
    Authorization: token,
  },
});
axiosMy.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res;
  },
  (err: AxiosError) => {
    throw err;
  },
);
export default axiosMy;
