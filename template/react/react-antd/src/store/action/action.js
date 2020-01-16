import axios from 'axios';


const req = axios.create({
    baseURL: "/proxy",
    timeout: 20000
});