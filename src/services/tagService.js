import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/api/tag";

export function getAllTags() {
    return http.get(apiEndpoint);
}
