import axios from "axios";

export const publicAPI = axios.create({
  baseURL: "https://harmoniq-server-big-team.onrender.com",
});
