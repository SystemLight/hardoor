import axios from 'axios';


let http = axios.create({
    baseURL: "/proxy",
    timeout: 20000,
});