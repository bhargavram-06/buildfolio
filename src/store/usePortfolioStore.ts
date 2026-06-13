import { create } from "zustand";

interface PortfolioState {
  username: string;
  profile: any;
  repositories: any[];
  statistics: any;
  theme: "Silent Coder" | "Modern Developer" | "Minimal Professional";
  isLoading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  setTheme: (theme: "Silent Coder" | "Modern Developer" | "Minimal Professional") => void;
  fetchProfileData: (username: string) => Promise<boolean>;
  savePortfolio: () => Promise<boolean>;
  resetStore: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  username: "",
  profile: null,
  repositories: [],
  statistics: null,
  theme: "Silent Coder",
  isLoading: false,
  error: null,

  setUsername: (username) => set({ username }),
  setTheme: (theme) => set({ theme }),
  resetStore: () => set({ username: "", profile: null, repositories: [], statistics: null, theme: "Silent Coder", error: null }),

  fetchProfileData: async (username: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/github?username=${encodeURIComponent(username)}`);
      const data = await response.json();

      if (!data.success) {
        set({ error: data.error || "User profile could not be found.", isLoading: false });
        return false;
      }

      set({
        username: data.profile.username,
        profile: data.profile,
        repositories: data.repositories,
        statistics: data.statistics,
        isLoading: false,
      });
      return true;
    } catch (err) {
      set({ error: "Network anomaly detected while fetching GitHub data.", isLoading: false });
      return false;
    }
  },

  savePortfolio: async () => {
    const { username, theme, profile, repositories, statistics } = get();
    if (!username || !profile) {
      set({ error: "No active profile data found to save." });
      return false;
    }
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, theme, githubData: { profile, repositories, statistics } }),
      });
      const data = await response.json();
      return data.success;
    } catch (err) {
      return false;
    }
  },
}));