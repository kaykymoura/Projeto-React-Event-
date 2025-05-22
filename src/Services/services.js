import axios from "axios";

const apiPorta = "5289";

//apilocal ela recebe o endereço da api
const apiLocal = `http://localhost:${apiPorta}/api/`;

const api = axios.create({
    baseURL: apiLocal

});

export default api;