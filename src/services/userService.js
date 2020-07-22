import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/register";

export function register({email, login, password}) {
    return http.post(apiEndpoint, {
        email,
        password,
        login
    });
}

export function activate(key) {
return http.get(`${apiUrl}/api/activate?key=${key}`);
}