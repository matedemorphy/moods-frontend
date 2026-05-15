import { api, toHttpError } from './../lib/axios';

export async function fetchMoodEntries() {
  try {
    const { data } = await api.get('/moods');

    return Array.isArray(data)
      ? data
      : [];
  } catch (e) {
    throw toHttpError(e);
  }
}

export async function createMoodEntry(input) {
  try {
    const { data } = await api.post("/moods", input);
    return data;
  } catch (e) {
    throw toHttpError(e);
  }
}
