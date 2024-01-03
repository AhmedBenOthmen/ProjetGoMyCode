import axios from "axios";

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        authorization:`${token}`
    }
});

export default api;
