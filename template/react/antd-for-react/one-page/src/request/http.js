import axios from 'axios';


const http = axios.create({
    baseURL: "/proxy",
    timeout: 20000
});

export default http;