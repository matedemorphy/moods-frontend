import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Pure projection of persisted moods for list UIs (search / mood filter / sort).
 * Keeps subscription logic out of the store object so Zustand can track deps cleanly.
 */
export function filterAndSortMoods(moods, { search, filter, sort }) {
  let result = [...moods];

  if (filter !== 'all') {
    result = result.filter((m) => m.mood === filter);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter((m) =>
      m.reason.toLowerCase().includes(q)
    );
  }

  if (sort === 'newest') {
    result.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sort === 'oldest') {
    result.sort((a, b) => a.createdAt - b.createdAt);
  }

  return result;
}

const useMoodStore = create(
  persist(
    (set, get) => ({
      moods: [],

      selectedMood: null,

      search: '',

      filter: 'all',

      sort: 'newest',

      username: '',

      setSelectedMood: (mood) => set({ selectedMood: mood }),

      clearSelectedMood: () => set({ selectedMood: null }),

      /** Pick a catalog mood for logging, or clear if the same mood is tapped again. */
      toggleMoodSelection: (mood) =>
        set((state) => ({
          selectedMood:
            state.selectedMood?.name === mood.name ? null : mood,
        })),

      setSearch: (search) => set({ search }),

      setFilter: (filter) => set({ filter }),

      setSort: (sort) => set({ sort }),

      setUsername: (username) => set({ username }),

      addMood: (reason) => {
        const { moods, selectedMood, username } = get();

        if (!selectedMood) return;

        const trimmed = reason.trim();
        if (!trimmed) return;

        const newMood = {
          id: crypto.randomUUID(),
          mood: selectedMood.name,
          emoji: selectedMood.emoji,
          reason: trimmed,
          username,
          createdAt: Date.now(),
        };

        set({
          moods: [newMood, ...moods],
          selectedMood: null,
        });
      },
    }),
    {
      name: 'mood-storage',
    }
  )
);

export default useMoodStore;
