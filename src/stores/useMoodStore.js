import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMoodStore = create(
  persist(
    (set, get) => ({
      moods: [],

      selectedMood: null,

      search: '',

      filter: 'all',

      sort: 'newest',

      username: '',

      // ─────────────────────────
      // Actions
      // ─────────────────────────

      setSelectedMood: (mood) =>
        set({ selectedMood: mood }),

      clearSelectedMood: () =>
        set({ selectedMood: null }),

      setSearch: (search) =>
        set({ search }),

      setFilter: (filter) =>
        set({ filter }),

      setSort: (sort) =>
        set({ sort }),

      setUsername: (username) =>
        set({ username }),

      addMood: (reason) => {
        const {
          moods,
          selectedMood,
          username,
        } = get();

        if (!selectedMood) return;

        const newMood = {
          id: crypto.randomUUID(),

          mood: selectedMood.name,

          emoji: selectedMood.emoji,

          reason,

          username,

          createdAt: Date.now(),
        };

        set({
          moods: [newMood, ...moods],

          selectedMood: null,
        });
      },

      // ─────────────────────────
      // Selectors
      // ─────────────────────────

      get filteredMoods() {
        const {
          moods,
          search,
          filter,
          sort,
        } = get();

        let result = [...moods];

        // filter

        if (filter !== 'all') {
          result = result.filter(
            (m) => m.mood === filter
          );
        }

        // search

        if (search.trim()) {
          result = result.filter((m) =>
            m.reason
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }

        // sort

        if (sort === 'newest') {
          result.sort(
            (a, b) =>
              b.createdAt - a.createdAt
          );
        }

        if (sort === 'oldest') {
          result.sort(
            (a, b) =>
              a.createdAt - b.createdAt
          );
        }

        return result;
      },
    }),
    {
      name: 'mood-storage',
    }
  )
);

export default useMoodStore;