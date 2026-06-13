import { BentoCard } from "./BentoCard";
import { FolderGit2, Star, GitFork, Users, Code2 } from "lucide-react";

interface StatsProps {
  totalRepos: number;
  stars: number;
  followers: number;
}

// 1. Stats Counters Grid block
export function StatsBlock({ totalRepos, stars, followers }: StatsProps) {
  const statItems = [
    { label: "Total Projects", value: totalRepos, icon: FolderGit2 },
    { label: "Stars Earned", value: stars, icon: Star },
    { label: "Followers", value: followers, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-[#0f1011] border border-[#27272a] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a1a1aa] font-medium">{item.label}</p>
            <p className="text-2xl font-bold text-[#f4f4f5] mt-1">{item.value}</p>
          </div>
          <item.icon className="w-5 h-5 text-[#15803d]" />
        </div>
      ))}
    </div>
  );
}

interface LanguageItem {
  language: string;
  count: number;
}

// 2. Top Languages List block
export function LanguagesBlock({ languages }: { languages: LanguageItem[] }) {
  const totalCount = languages.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-3 w-full">
      {languages.slice(0, 4).map((lang, idx) => {
        const percentage = totalCount > 0 ? (lang.count / totalCount) * 100 : 0;
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#f4f4f5]">{lang.language}</span>
              <span className="text-[#a1a1aa]">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-[#0f1011] rounded-full h-1.5">
              <div
                className="bg-[#15803d] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface RepoItem {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  htmlUrl: string;
}

// 3. Project Repositories Stream block
export function RepositoriesBlock({ repos }: { repos: RepoItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[320px] overflow-y-auto pr-1">
      {repos.map((repo, idx) => (
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          key={idx}
          className="p-4 bg-[#0f1011] border border-[#27272a] rounded-lg hover:border-[#15803d] transition-colors group/item flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#f4f4f5] group-hover/item:text-[#15803d] transition-colors truncate max-w-[80%]">
                {repo.name}
              </h4>
              <span className="text-[10px] bg-[#16181a] border border-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded-full">
                {repo.language}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2">
              {repo.description}
            </p>
          </div>
          <div className="flex gap-4 mt-3 text-[11px] text-[#a1a1aa]">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#15803d]" /> {repo.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3 text-zinc-500" /> {repo.forks}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}