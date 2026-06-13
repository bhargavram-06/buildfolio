"use client";

import { useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { BentoCard } from "@/components/bento/BentoCard";
import { StatsBlock, LanguagesBlock, RepositoriesBlock } from "@/components/bento/BentoGridItems";
import { Search, LayoutGrid, Palette, CloudUpload, Sparkles, CheckCircle, FolderGit2 } from "lucide-react";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  
  const { 
    profile, 
    repositories, 
    statistics, 
    isLoading, 
    error, 
    theme, 
    setTheme, 
    fetchProfileData, 
    savePortfolio 
  } = usePortfolioStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;
    setGeneratedLink(null); // Clear previous links on new search
    await fetchProfileData(inputUsername.trim());
  };

  const handlePublish = async () => {
    setSaveStatus("saving");
    const success = await savePortfolio();
    if (success && profile) {
      setSaveStatus("success");
      // Auto-detects if running on localhost or a live Vercel production domain
      setGeneratedLink(`${window.location.origin}/${profile.username.toLowerCase()}`);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1011] text-[#f4f4f5] px-4 py-12 md:px-8">
      {/* 1. Elite Header Banner */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between border-b border-[#27272a] pb-8 mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#16181a] border border-[#27272a] text-[#15803d] mb-3">
            <Sparkles className="w-3 h-3" /> Devlynix Buildathon 2.0 MVP Sprint
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Buildfolio<span className="text-[#15803d]">.</span>
          </h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Where Code Becomes Credibility</p>
        </div>

        {/* Real-time GitHub Username Search Input */}
        <form onSubmit={handleSearch} className="flex w-full md:w-auto items-center gap-2 bg-[#16181a] border border-[#27272a] rounded-lg p-1.5 focus-within:border-[#15803d] transition-all">
          <div className="flex items-center gap-2 px-2 text-[#a1a1aa]">
            <FolderGit2 className="w-4 h-4 text-[#15803d]" />
          </div>
          <input
            type="text"
            placeholder="Enter GitHub Username..."
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            disabled={isLoading}
            className="bg-transparent text-sm font-medium focus:outline-none w-full md:w-64 text-[#f4f4f5] placeholder:text-[#a1a1aa]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#15803d] hover:bg-[#166534] text-white font-medium text-xs px-4 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            {isLoading ? "Syncing..." : "Generate"}
          </button>
        </form>
      </header>

      {/* 2. Advanced Link Export Clipboard Notification Component */}
      {generatedLink && (
        <div className="max-w-6xl mx-auto bg-[#16181a] border border-[#15803d]/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#15803d]/10 flex items-center justify-center text-[#15803d]">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Cloud Synchronization Successful</p>
              <p className="text-xs text-[#a1a1aa] font-mono mt-0.5 break-all">{generatedLink}</p>
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedLink);
              alert("Portfolio link copied to clipboard!");
            }}
            className="w-full sm:w-auto bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer text-center"
          >
            Copy Public URL
          </button>
        </div>
      )}

      {/* 3. Error Display Message */}
      {error && (
        <div className="max-w-6xl mx-auto bg-red-950/20 border border-red-900 text-red-400 p-4 rounded-lg text-sm text-center mb-8">
          ⚠️ {error}
        </div>
      )}

      {/* 4. Empty State / Entry Landing View */}
      {!profile && !isLoading && (
        <section className="max-w-xl mx-auto text-center py-20 space-y-6">
          <div className="w-16 h-16 bg-[#16181a] border border-[#27272a] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <LayoutGrid className="w-6 h-6 text-[#15803d]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">No Active Portfolio Compiled</h2>
            <p className="text-sm text-[#a1a1aa] max-w-sm mx-auto">
              Input your public GitHub username in the field above to instantly convert your live repositories into a polished Bento Grid showcase.
            </p>
          </div>
        </section>
      )}

      {/* 5. Loader Visual Animation state */}
      {isLoading && (
        <div className="max-w-6xl mx-auto text-center py-32 space-y-4">
          <div className="w-8 h-8 border-4 border-[#15803d] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-[#a1a1aa] font-medium">Extracting developer telemetry records from the GitHub engine...</p>
        </div>
      )}

      {/* 6. Hydrated Real-Data Bento Grid Workspace Dashboard */}
      {profile && !isLoading && statistics && (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Dashboard Control Custom Actions Bar */}
          <div className="bg-[#16181a] border border-[#27272a] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-[#15803d]" />
              <div className="flex gap-2">
                {(["Silent Coder", "Modern Developer", "Minimal Professional"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`text-xs px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer border ${
                      theme === t
                        ? "bg-[#15803d] text-white border-[#15803d]"
                        : "bg-[#0f1011] text-[#a1a1aa] border-[#27272a] hover:border-[#15803d]/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePublish}
              disabled={saveStatus === "saving"}
              className="w-full sm:w-auto bg-[#16181a] border border-[#27272a] hover:border-[#15803d] text-[#f4f4f5] text-xs font-semibold px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-50"
            >
              {saveStatus === "saving" && <div className="w-3 h-3 border-2 border-[#15803d] border-t-transparent rounded-full animate-spin" />}
              {saveStatus === "idle" && <CloudUpload className="w-4 h-4 text-[#15803d]" />}
              {saveStatus === "success" && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {saveStatus === "saving" ? "Syncing Atlas..." : saveStatus === "success" ? "Saved to Database!" : "Publish Portfolio"}
            </button>
          </div>

          {/* Master Bento Grid Configuration Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column Left: Identity & Language telemetry */}
            <div className="lg:col-span-1 space-y-6 flex flex-col">
              {/* Profile Card Block */}
              <BentoCard className="flex-1" title="Identity Framework" description={`Theme: ${theme}`}>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      className="w-16 h-16 rounded-xl border border-[#27272a] bg-[#0f1011]"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#f4f4f5] tracking-tight">{profile.name}</h3>
                      <p className="text-xs text-[#15803d] font-mono">@{profile.username}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed bg-[#0f1011] p-3 rounded-lg border border-[#27272a]">
                    {profile.bio}
                  </p>
                </div>
              </BentoCard>

              {/* Language Distribution Block */}
              <BentoCard title="Telemetry Summary" description="Distribution of top languages across active builds">
                <div className="mt-2">
                  {statistics.topLanguages.length > 0 ? (
                    <LanguagesBlock languages={statistics.topLanguages} />
                  ) : (
                    <p className="text-xs text-[#a1a1aa] italic">No syntax definitions detected.</p>
                  )}
                </div>
              </BentoCard>
            </div>

            {/* Column Right: Wide Metrics Data Blocks */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              {/* Top Overview Counters Block */}
              <div className="w-full">
                <StatsBlock 
                  totalRepos={statistics.totalProjects} 
                  stars={statistics.totalStars} 
                  followers={profile.followers} 
                />
              </div>

              {/* Verified Code Repositories Output Feed */}
              <BentoCard className="flex-1" title="Verified Repositories Ecosystem" description="Real proof-of-work modules pulled from active version streams">
                <div className="mt-2 text-zinc-400">
                  <RepositoriesBlock repos={repositories} />
                </div>
              </BentoCard>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}