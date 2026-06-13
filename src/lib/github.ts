import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

// Setup token headers if available to drastically increase API rate limits
const headers = process.env.GITHUB_ACCESS_TOKEN
  ? { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` }
  : {};

export interface GitHubProfileData {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GitHubRepositoryData {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  htmlUrl: string;
  updatedAt: string;
}

/**
 * Fetches core profile info, public repositories, and maps out top programming languages.
 */
export async function fetchGitHubData(username: string) {
  try {
    // 1. Fetch Basic Profile Data
    const profileResponse = await axios.get(`${GITHUB_API_URL}/users/${username}`, { headers });
    const p = profileResponse.data;

    const profile: GitHubProfileData = {
      name: p.name || p.login,
      username: p.login,
      avatarUrl: p.avatar_url,
      bio: p.bio || "This developer hasn't set a bio yet.",
      followers: p.followers,
      following: p.following,
      publicRepos: p.public_repos,
    };

    // 2. Fetch Repositories Data
    const reposResponse = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`, { headers });
    
    const repositories: GitHubRepositoryData[] = reposResponse.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || "Markdown",
      htmlUrl: repo.html_url,
      updatedAt: repo.updated_at,
    }));

    // 3. Compute Language Distribution Metrics
    const languageCounts: Record<string, number> = {};
    let totalStars = 0;

    repositories.forEach((repo) => {
      totalStars += repo.stars;
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Sort languages to get top-performing choices
    const topLanguages = Object.entries(languageCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    return {
      success: true,
      profile,
      repositories: repositories.slice(0, 12), // Keep top 12 most recently updated repos for the MVP layout
      statistics: {
        totalStars,
        topLanguages,
        totalProjects: repositories.length,
      }
    };
  } catch (error: any) {
    console.error("Error harvesting GitHub information:", error.message);
    return { success: false, error: error.message || "Failed to fetch user data" };
  }
}