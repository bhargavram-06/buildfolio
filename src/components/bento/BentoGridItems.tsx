"use client";

import { useState } from "react";
import { FolderGit2, Star, GitFork, Users, Search } from "lucide-react";

// 📊 METRICS ROW SECTION
export function StatsBlock({ totalRepos, stars, followers }: any) {
  return (
    <div style={{ display: "flex", gap: "16px", width: "100%", flexWrap: "wrap", marginBottom: "16px" }}>
      
      {/* 📂 TOTAL PROJECTS CARD */}
      <div style={{ flex: "1", minWidth: "150px", backgroundColor: "#16181a", border: "1px solid #27272a", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total Projects</p>
          <p style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", margin: "4px 0 0 0" }}>{totalRepos || 0}</p>
        </div>
        <FolderGit2 style={{ width: "20px", height: "20px", color: "#15803d" }} />
      </div>

      {/* ⭐ STARS EARNED CARD */}
      <div style={{ flex: "1", minWidth: "150px", backgroundColor: "#16181a", border: "1px solid #27272a", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Stars Earned</p>
          <p style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", margin: "4px 0 0 0" }}>{stars || 0}</p>
        </div>
        <Star style={{ width: "20px", height: "20px", color: "#15803d" }} />
      </div>

      {/* 👥 FOLLOWERS CARD */}
      <div style={{ flex: "1", minWidth: "150px", backgroundColor: "#16181a", border: "1px solid #27272a", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Followers</p>
          <p style={{ fontSize: "20px", fontWeight: "900", color: "#ffffff", margin: "4px 0 0 0" }}>{followers || 0}</p>
        </div>
        <Users style={{ width: "20px", height: "20px", color: "#15803d" }} />
      </div>

    </div>
  );
}

// 📈 SYNTAX TELEMETRY PROGRESS BARS SECTION
export function LanguagesBlock({ languages }: { languages: any[] }) {
  if (!languages || languages.length === 0) {
    return <p style={{ fontSize: "12px", color: "#a1a1aa", fontStyle: "italic" }}>No distribution logs found.</p>;
  }
  const total = languages.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      {languages.slice(0, 4).map((lang, idx) => {
        const percentage = total > 0 ? (lang.count / total) * 100 : 0;
        return (
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
              <span style={{ color: "#e4e4e7", fontWeight: "600" }}>{lang.language}</span>
              <span style={{ color: "#a1a1aa", fontFamily: "monospace" }}>{Math.round(percentage)}%</span>
            </div>
            <div style={{ width: "100%", backgroundColor: "#0f1011", height: "6px", borderRadius: "999px", border: "1px solid #27272a", overflow: "hidden" }}>
              <div style={{ backgroundColor: "#15803d", height: "100%", width: `${percentage}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 📂 REPOSITORIES CONTENT SECTION - Forced visible links and clear layouts
export function RepositoriesBlock({ repos }: { repos: any[] }) {
  const [query, setQuery] = useState("");

  const filtered = (repos || []).filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    (r.language && r.language.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Explicitly Configured Search Bar Input Box */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#0f1011", border: "1px solid #27272a", borderRadius: "8px", padding: "8px 12px" }}>
        <Search style={{ width: "14px", height: "14px", color: "#a1a1aa" }} />
        <input
          type="text"
          placeholder="Filter repositories by keyword handle..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ backgroundColor: "transparent", border: "none", outline: "none", fontSize: "12px", color: "#ffffff", width: "100%" }}
        />
      </div>

      {/* Grid container with hardcoded alignments */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px", maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
        {filtered.length > 0 ? (
          filtered.map((repo, idx) => (
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              key={idx}
              style={{ backgroundColor: "#0f1011", border: "1px solid #27272a", borderRadius: "12px", padding: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none", minHeight: "100px" }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  {/* High-visibility green links */}
                  <h4 style={{ fontSize: "12px", fontWeight: "bold", color: "#10b981", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {repo.name}
                  </h4>
                  <span style={{ fontSize: "9px", backgroundColor: "#16181a", border: "1px solid #27272a", color: "#a1a1aa", padding: "2px 6px", borderRadius: "4px", fontFamily: "monospace" }}>
                    {repo.language}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#a1a1aa", margin: "6px 0 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4" }}>
                  {repo.description}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px", fontSize: "10px", color: "#71717a", fontFamily: "monospace" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><Star style={{ width: "10px", height: "10px", color: "#15803d" }} /> {repo.stars}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "2px" }}><GitFork style={{ width: "10px", height: "10px", color: "#71717a" }} /> {repo.forks}</span>
              </div>
            </a>
          ))
        ) : (
          <p style={{ fontSize: "12px", color: "#71717a", fontStyle: "italic", textAlign: "center", gridColumn: "1/-1", padding: "24px 0" }}>No data found.</p>
        )}
      </div>
    </div>
  );
}