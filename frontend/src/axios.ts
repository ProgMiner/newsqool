import globalAxios from 'axios';

import { apiUrl } from './config';


export const axios = globalAxios.create({
    baseURL: apiUrl,
    maxRedirects: 0,
});
