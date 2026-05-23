import { create } from "zustand";

export function filterAndSortMoods(moods, { search = "", filter = "all", sort = "newest" }) {
  let result = [...moods];
  if (filter !== "all") {
    result = result.filter((m) => m.mood === filter);
  }
  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter((m) =>
      String(m.reason ?? "")
        .toLowerCase()
        .includes(q),
    );
  }
  if (sort === "newest") {
    result.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sort === "oldest") {
    result.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }
  return result;
}
const useHistoryFiltersStore = create((set) => ({
  search: "",
  filter: "all",
  sort: "newest",
  setSearch: (search) => set({ search }),
  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  reset: () => set({ search: "", filter: "all", sort: "newest" }),
}));

export default useHistoryFiltersStore;
