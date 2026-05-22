import { create } from "zustand";

const getInitialTheme = () => {
  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme;
  }

  return "dark";
};

const useThemeStore = create((set) => ({
  theme: getInitialTheme(),

  toggleTheme: () =>
    set((state) => {
      const nextTheme =
        state.theme === "dark"
          ? "light"
          : "dark";

      localStorage.setItem(
        "theme",
        nextTheme
      );

      return {
        theme: nextTheme,
      };
    }),
}));

export default useThemeStore;