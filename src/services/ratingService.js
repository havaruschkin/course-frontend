import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/rating";

function ratingUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function isRating(compositionId) {
    return http.get(`${apiEndpoint}/isRating/${compositionId}`);
}

export function getUserRating(compositionId) {
    return http.get(`${apiEndpoint}/userRating/${compositionId}`);
}

export function getRatingComposition(compositionId) {
    return http.get(ratingUrl(compositionId));
}

export function saveRating(rating) {
    return http.post(apiEndpoint, rating);
}