import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "devices-storage"
    },
});
