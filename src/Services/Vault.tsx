import axios from "axios";

const dev = '';
const prod = '';


const Vault = axios.create({
  baseURL: dev
});

export default Vault;
