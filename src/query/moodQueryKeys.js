/**
 * Central query key factory for mood log entries (server `/moods` collection).
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
 */
export const moodEntryKeys = {
  all: ['mood-entries'],
  stats: ["moods", "stats"],
};
