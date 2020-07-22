import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/users";

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(username) {
  return http.get(`${apiEndpoint}/user/${username}`);
}

export function lockUsers(userIds) {
  return http.post(apiEndpoint + '/lock', userIds);
}

export function unlockUsers(userIds) {
  return http.post(apiEndpoint + '/unlock', userIds);
}

export function deleteUsers(userIds) {
  return http.post(apiEndpoint + '/delete', userIds);
}

export function updateUser(user) {
  return http.post(apiEndpoint + '/updateUser', user);
}