import { create } from "zustand";

interface GitHubProfile {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  htmlUrl: string;
  updatedAt: string;
}

interface GitHubStats {
  totalStars: number;
  topLanguages: Array<{ language: string; count: number }>;
  totalProjects: number;
}

interface PortfolioState {
  username: string;
  profile: GitHubProfile | null;
  repositories: GitHubRepo[];
  statistics: GitHubStats | null;
  theme: "Silent Coder" | "Modern Developer" | "Minimal Professional";
  isLoading: boolean;
  error: string | null;
  
  // Actions
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

  resetStore: () => set({
    username: "",
    profile: null,
    repositories: [],
    statistics: null,
    theme: "Silent Coder",
    error: null
  }),

  // Asynchronously queries the backend API route we made in Step 3
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
    } catch (err: any) {
      set({ error: "Network anomaly detected while fetching GitHub data.", isLoading: false });
      return false;
    }
  },

  // Calls our MongoDB database layer to preserve state configuration modifications
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
        body: JSON.stringify({
          username,
          theme,
          githubData: { profile, repositories, statistics },
        }),
      });
      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error("Failed storing state settings cleanly:", err);
      return false;
    }
  },
}));