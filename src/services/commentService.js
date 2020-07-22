import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/comment";

function commentUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getComments(compositionId) {
    return http.get(commentUrl(compositionId));
}