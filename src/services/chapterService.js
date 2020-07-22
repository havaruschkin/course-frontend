import http from "./httpService";
import {apiUrl} from "../config.json";

let apiEndpoint = apiUrl + "/api/chapter";

function chapterUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getChapters() {
    return http.get(apiEndpoint);
}

export function getChapter(chapterId) {
    return http.get(chapterUrl(chapterId));
}

export function saveChapter(chapter, id) {
    if (chapter.id) {
        return http.put(chapterUrl(id), chapter);
    }
    return http.post(chapterUrl(id), chapter);
}

export function deleteChapter(chapterId) {
    return http.delete(chapterUrl(chapterId));
}