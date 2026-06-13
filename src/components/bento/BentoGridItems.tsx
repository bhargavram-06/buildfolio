"use client";

import { useState } from "react";
import { FolderGit2, Star, GitFork, Users, Search } from "lucide-react";

// 📊 SECTION 1: COUNTERS (Total Projects, Stars, Followers)
export function StatsBlock({ totalRepos, stars, followers }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      <div className="bg-[#121315] border border-[#222326] rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Projects</p>
          <p className="text-lg font-black text-white mt-0.5">{totalRepos || 0}</p>
        </div>
        <FolderGit2 className="w-4 h-4 text-[#15803d]" />
      </div>
      <div className="bg-[#121315] border border-[#222326] rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Stars Earned</p>
          <p className="text-lg font-black text-white mt-0.5">{stars || 0}</p>
        </div>
        <Star className="w-4 h-4 text-[#15803d]" />
      </div>
      <div className="bg-[#121315] border border-[#222326] rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Followers</p>
          <p className="text-lg font-black text-white mt-0.5">{followers || 0}</p>
        </div>
        <Users className="w-4 h-4 text-[#15803d]" />
      </div>
    </div>
  );
}

// 📈 SECTION 2: SYNTAX METRICS (Language Progress Bars)
export function LanguagesBlock({ languages }: { languages: any[] }) {
  if (!languages || languages.length === 0) {
    return <p className="text-xs text-zinc-600 italic p-1">No syntax recorded.</p>;
  }
  const total = languages.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-3 w-full pt-1">
      {languages.slice(0, 4).map((lang, idx) => {
        const percentage = total > 0 ? (lang.count / total) * 100 : 0;
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-semibold text-[11px]">{lang.language}</span>
              <span className="text-zinc-500 font-mono text-[11px]">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-[#0b0c0d] rounded-full h-1.5 border border-[#222326]">
              <div className="bg-[#15803d] h-1.5 rounded-full" style={{ width: `${percentage}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 📂 SECTION 3: ECOSYSTEM REPOSITORIES (Clean Filtered Cards)
export function RepositoriesBlock({ repos }: { repos: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = (repos || []).filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    (r.language && r.language.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-2 bg-[#0b0c0d] border border-[#222326] rounded-lg px-2.5 py-1.5 focus-within:border-[#15803d]/60 transition-all">
        <Search className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        <input
          type="text"
          placeholder="Filter repositories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-zinc-700 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[210px] overflow-y-auto custom-scrollbar pr-0.5">
        {filtered.length > 0 ? (
          filtered.map((repo, idx) => (
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              key={idx}
              className="p-3 bg-[#0b0c0d] border border-[#222326] rounded-xl hover:border-[#15803d]/40 transition-colors flex flex-col justify-between min-h-[95px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[11px] font-bold text-zinc-200 truncate max-w-[70%]">{repo.name}</h4>
                  <span className="text-[9px] bg-[#121315] border border-[#222326] text-zinc-400 px-1.5 py-0.5 rounded font-mono shrink-0">
                    {repo.language}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 leading-tight">
                  {repo.description}
                </p>
              </div>
              <div className="flex gap-3 mt-2 text-[9px] text-zinc-500 font-mono">
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-[#15803d]" /> {repo.stars}</span>
                <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3 text-zinc-700" /> {repo.forks}</span>
              </div>
            </a>
          ))
        ) : (
          <p className="text-xs text-zinc-600 italic py-8 text-center col-span-2">No matching repositories found.</p>
        )}
      </div>
    </div>
  );
}