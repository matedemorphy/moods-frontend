import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { moodEntryKeys } from '../query/moodQueryKeys';
import { createMoodEntry, fetchMoodEntries } from '../services/moods';

export function useMoodEntriesQuery(queryOptions = {}) {
  return useQuery({
    queryKey: moodEntryKeys.all,
    queryFn: fetchMoodEntries,
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
      await queryClient.invalidateQueries({ queryKey: moodEntryKeys.all });
    },
  });
}
