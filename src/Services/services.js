// Importa o Axios, que é uma biblioteca para fazer requisições HTTP
import axios from "axios";

// Define a porta onde a API backend está rodando localmente
const apiPorta = "5289";

// Monta a URL base da API local usando a porta definida
const apiLocal = `http://localhost:${apiPorta}/api/`;

// Cria uma instância do Axios já configurada com a URL base da API
const api = axios.create({
    baseURL: apiLocal
});

// Exporta essa instância para ser usada em outras partes do projeto (ex: para fazer chamadas à API)
export default api;

