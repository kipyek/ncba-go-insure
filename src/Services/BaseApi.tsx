import axios from "axios";


const dev = 'https://ncbaportal.pensoft.co.ke/api/';
const qa = '';
const prod = '';


const BaseApi = axios.create({
  baseURL: dev
});

export default BaseApi;


//https://ncbaportal.pensoft.co.ke/api/
