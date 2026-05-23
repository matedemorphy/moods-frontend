import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { moodEntryKeys } from '../query/moodQueryKeys';
import { createMoodEntry, fetchMoodEntries, fetchMoodStats } from '../services/moods';

export function useMoodEntriesQuery(queryOptions = {}) {
  return useQuery({
    queryKey: moodEntryKeys.all,
    queryFn: fetchMoodEntries,
    ...queryOptions,
  });
}

export function useMoodStatsQuery(queryOptions = {}) {
  return useQuery({
    queryKey: moodEntryKeys.stats,
    queryFn: fetchMoodStats,
    ...queryOptions,
  });
}

export function useCreateMoodEntryMutation(mutationOptions = {}) {
  const queryClient = useQueryClient();
  const { onSettled, ...rest } = mutationOptions;

  return useMutation({
    mutationFn: createMoodEntry,
    ...rest,
    onSettled: async (...args) => {
      await onSettled?.(...args);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: moodEntryKeys.all }),
        queryClient.invalidateQueries({ queryKey: moodEntryKeys.stats }),
      ]);
    },
  });
}
