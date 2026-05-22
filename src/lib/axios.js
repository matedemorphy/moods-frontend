import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

export function toHttpError(error) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    const message =
      error.response?.data?.message ??
      error.response?.statusText ??
      error.message;

    const err = new Error(message || "Request failed");

    err.status = status;
    err.cause = error;

    return err;
  }

  return error instanceof Error
    ? error
    : new Error(String(error));
}