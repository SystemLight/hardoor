import axios from 'axios';


export const http = axios.create({
    baseURL: "/proxy",
    timeout: 20000
});