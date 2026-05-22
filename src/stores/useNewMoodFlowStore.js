import { create } from "zustand";

const initialState = {
  selectedMood: null,
};

const useNewMoodFlowStore = create((set) => ({
  ...initialState,
  selectedMood: null,
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  clearSelectedMood: () => set({ selectedMood: null }),
  toggleMoodSelection: (mood) =>
    set((state) => ({
      selectedMood: state.selectedMood?.name === mood.name ? null : mood,
    })),
  reset: () => set({ selectedMood: null }),
}));

export default useNewMoodFlowStore;
