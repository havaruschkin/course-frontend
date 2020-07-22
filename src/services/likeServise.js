import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/like";

function likeUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function isLike(chapterId) {
    return http.get(`${apiEndpoint}/isLike/${chapterId}`);
}

export function getCountLikes(chapterId) {
    return http.get(`${apiEndpoint}/count/${chapterId}`);
}

export function saveLike(chapterId) {
    return http.post(likeUrl(chapterId));
}