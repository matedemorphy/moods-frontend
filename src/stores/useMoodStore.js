import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export function filterAndSortMoods(moods, { search, filter, sort }) {
  let result = [...moods];

  if (filter !== 'all') {
    result = result.filter((m) => m.mood === filter);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter((m) =>
      String(m.reason ?? '')
        .toLowerCase()
        .includes(q)
    );
  }

  if (sort === 'newest') {
    result.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  } else if (sort === 'oldest') {
    result.sort((a, b) => Number(a.createdAt) - Number(b.createdAt));
  }

  return result;
}

const useMoodStore = create(
  persist(
    (set) => ({
      selectedMood: null,

      search: '',

      filter: 'all',

      sort: 'newest',

      username: '',

      setSelectedMood: (mood) => set({ selectedMood: mood }),

      clearSelectedMood: () => set({ selectedMood: null }),

      toggleMoodSelection: (mood) =>
        set((state) => ({
          selectedMood:
            state.selectedMood?.name === mood.name ? null : mood,
        })),

      setSearch: (search) => set({ search }),

      setFilter: (filter) => set({ filter }),

      setSort: (sort) => set({ sort }),

      setUsername: (username) => set({ username }),
    }),
    {
      name: 'mood-ui-storage',
      partialize: (state) => ({
        username: state.username,
        search: state.search,
        filter: state.filter,
        sort: state.sort,
      }),
    }
  )
);

export default useMoodStore;
