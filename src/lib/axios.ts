import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://flipkart-email-mock.now.sh",
});
