import axios from "axios";


const dev = 'https://ncbadigitalapi.pensoft.co.ke/api/';
const qa = '';
const prod = '';


const BaseApi = axios.create({
    baseURL: dev
});

export default BaseApi;
