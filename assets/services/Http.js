import axios from 'axios';
import { URL_HOST } from '../config';

const instance = axios.create({baseURL: URL_HOST});
export default instance