import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:3000",
});

export const addToWishlistApi = (userId, item) =>
  api.post(`/users/${userId}/wisshlist`, item);
