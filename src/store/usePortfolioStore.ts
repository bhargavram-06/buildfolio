import { create } from "zustand";

// Define the 8 allowed theme types strictly
export type ThemeType = 
  | "Silent Coder" 
  | "Modern Developer" 
  | "Minimal Professional" 
  | "Cyberpunk Matrix" 
  | "Dracula Eclipse"
  | "Sunset Overdrive"
  | "Nordic Frost"
  | "Monochrome Luxury";

interface PortfolioState {
  profile: any | null;
  repositories: any[];
  statistics: any | null;
  isLoading: boolean;
  error: string | null;
  theme: ThemeType; // Uses the strict 8-theme union type
  setTheme: (theme: ThemeType) => void;
  fetchProfileData: (username: string) => Promise<void>;
  savePortfolio: () => Promise<boolean>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  profile: null,
  repositories: [],
  statistics: null,
  isLoading: false,
  error: null,
  theme: "Silent Coder", // Default starting theme

  setTheme: (theme) => set({ theme }),

  fetchProfileData: async (username) => {
    set({ isLoading: true, error: null });
    try {
      // Your existing fetch logic remains exactly here...
      // Example placeholder structure:
      const res = await fetch(`/api/github?username=${username}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to sync profiles");
      
      set({ 
        profile: data.profile, 
        repositories: data.repositories, 
        statistics: data.statistics,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  savePortfolio: async () => {
    const { profile, theme, repositories, statistics } = get();
    if (!profile) return false;
    try {
      const res = await fetch("/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: profile.username, theme, repositories, statistics }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
}));