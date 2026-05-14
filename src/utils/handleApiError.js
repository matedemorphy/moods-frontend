export function handleApiError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return "Invalid request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 422:
        return error.response.data?.message || "Invalid data";
      case 500:
        return "Server Error";
      default:
        return "Unknown error";
    }
  }
  if (error.request) return "No internet connection";
  return error.message || "Unexpected error";
}
