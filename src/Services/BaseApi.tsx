import axios from "axios";


const dev = '';
const qa = '';
const prod = '';


const BaseApi = axios.create({
  baseURL: dev
});

export default BaseApi;
