"use client";

import { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { StatsBlock, LanguagesBlock, RepositoriesBlock } from "@/components/bento/BentoGridItems";
import { Search, Palette, CloudUpload, FolderGit2, CheckCircle, ExternalLink, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";

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

  // 🎨 MULTI-THEME LIVE CANVAS MATRIX ROUTER
  const [canvasStyles, setCanvasStyles] = useState({
    background: "bg-[#111214] text-[#f4f4f5]",
    cardStyle: "bg-[#16181a] border-[#222326]",
    accentText: "text-[#15803d]",
    fontFamily: "font-sans"
  });

  // Watch the theme state and switch live canvas styles instantly on button clicks
  useEffect(() => {
    if (theme === "Modern Developer") {
      setCanvasStyles({
        background: "bg-[#090d16] text-[#e2e8f0]",
        cardStyle: "bg-[#111827] border-emerald-500/20 shadow-md",
        accentText: "text-emerald-400 font-bold",
        fontFamily: "font-mono"
      });
    } else if (theme === "Minimal Professional") {
      setCanvasStyles({
        background: "bg-[#121212] text-[#fafafa]",
        cardStyle: "bg-[#1c1c1c] border-zinc-800",
        accentText: "text-zinc-400 border-b border-zinc-700 pb-0.5",
        fontFamily: "font-serif"
      });
    } else {
      setCanvasStyles({
        background: "bg-[#111214] text-[#f4f4f5]",
        cardStyle: "bg-[#16181a] border-[#222326]",
        accentText: "text-[#15803d]",
        fontFamily: "font-sans"
      });
    }
  }, [theme]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;
    setGeneratedLink(null);
    await fetchProfileData(inputUsername.trim());
  };

  const handlePublish = async () => {
    setSaveStatus("saving");
    const success = await savePortfolio();
    if (success && profile) {
      setSaveStatus("success");
      setGeneratedLink(`${window.location.origin}/${profile.username.toLowerCase()}`);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0c0d] text-[#f4f4f5] antialiased font-sans flex flex-col">
      
      {/* 🧭 NAVIGATION BUILDER DECK CONTROL BAR */}
      <nav className="w-full bg-[#111214] border-b border-[#222326] px-4 py-3 md:px-8 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-300">
              Buildfolio <span className="text-[#15803d]">Studio</span>
            </span>
          </div>

          <form onSubmit={handleSearch} className="flex w-full sm:w-auto items-center gap-2 bg-[#16181a] border border-[#27272a] rounded-xl p-1 focus-within:border-[#15803d] transition-all">
            <div className="pl-2.5">
              <FolderGit2 className="w-3.5 h-3.5 text-[#15803d]" />
            </div>
            <input
              type="text"
              placeholder="Compile public GitHub username..."
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              disabled={isLoading}
              className="bg-transparent text-xs font-medium focus:outline-none w-full sm:w-52 text-[#f4f4f5] placeholder:text-zinc-600 py-1"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs px-4 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Sync..." : "Generate"}
            </button>
          </form>
        </div>
      </nav>

      {/* 💼 WORKSPACE CONTROL ROOM */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-6 space-y-4">
        
        {/* URL Sync Export Banner Box */}
        {generatedLink && (
          <div className="w-full bg-[#111612] border border-[#15803d]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Portfolio Live & Saved</p>
                <p className="text-xs text-zinc-400 font-mono mt-0.5 break-all">{generatedLink}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  alert("Link copied!");
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-3 py-1.5 rounded-md cursor-pointer"
              >
                Copy Link
              </button>
              <Link
                href={`/${profile?.username.toLowerCase()}`}
                target="_blank"
                className="bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
              >
                View Page <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-950/20 border border-red-900/40 text-red-400 p-3 rounded-xl text-xs text-center font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Theme Modifiers Deck - HIGH CONTRAST TEXT & VISIBILITY */}
        {profile && !isLoading && (
          <div className="w-full bg-[#121315] border border-[#222326] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto py-0.5">
              <div className="flex items-center gap-1 text-zinc-300 text-xs font-bold uppercase tracking-wider shrink-0">
                <Palette className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Theme Mixer:</span>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {(["Silent Coder", "Modern Developer", "Minimal Professional"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`text-xs px-2.5 py-1.5 font-bold rounded-lg border transition-all cursor-pointer ${
                      theme === t
                        ? "bg-[#15803d] text-white border-[#15803d] shadow"
                        : "bg-[#1c1e22] text-zinc-100 border-[#2d3139] hover:border-zinc-500"
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
              className="w-full sm:w-auto bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              {saveStatus === "saving" ? "Publishing..." : "Publish Portfolio"}
            </button>
          </div>
        )}
      </div>

      {/* 🖼️ REAL-TIME PREVIEW WORKSPACE DECK */}
      <div className="max-w-5xl mx-auto w-full px-4 pb-20 flex-1 flex flex-col mt-4">
        
        {!profile && !isLoading && (
          <div className="text-center py-28 space-y-2 max-w-sm mx-auto flex-1 flex flex-col justify-center">
            <FolderGit2 className="w-8 h-8 text-zinc-700 mx-auto" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Workspace Empty</h3>
            <p className="text-xs text-zinc-500">Enter your GitHub profile username in the nav deck controller above.</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-32 space-y-2 flex-1 flex flex-col justify-center">
            <div className="w-5 h-5 border-2 border-[#15803d] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-zinc-600 font-mono tracking-widest">COMPILING VERSION SCHEMAS FROM ATOM RECOS...</p>
          </div>
        )}

        {/* THE REAL PORTFOLIO SETUP LIVE CANVAS GRID */}
        {profile && !isLoading && statistics && (
          <div className="space-y-4 w-full animate-fadeIn">
            
            <div className="border-l-2 border-[#15803d] pl-2.5 py-0.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Live Canvas Screen View</h2>
            </div>

            {/* LIVE REACTIVE CONTAINER BASE */}
            <div className={`w-full rounded-xl p-5 border border-[#222326] transition-all duration-300 shadow-xl ${canvasStyles.background} ${canvasStyles.fontFamily} space-y-5`}>
              
              {/* Top Layout Heading Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/50 pb-2.5 text-[10px] font-mono tracking-wider font-bold text-zinc-500">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>BUILDFOLIO // VERIFIED_PROOF_OF_WORK</span>
                </div>
                <span className="bg-zinc-900 border border-zinc-800 text-[#15803d] px-1.5 py-0.5 rounded text-[9px]">
                  {theme}
                </span>
              </div>

              {/* 📐 TWO-COLUMN MAIN ALIGNMENT GRID CONTAINER */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                
                {/* 1. LEFT SIDEBAR COLUMN */}
                <div className="lg:col-span-1 flex flex-col gap-5 w-full">
                  
                  {/* DEVELOPER CONTEXT: Cleaned and shrunk down significantly */}
                  <div className={`rounded-xl p-4 border transition-all ${canvasStyles.cardStyle} space-y-3`}>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Developer Context</p>
                    <div className="flex items-center gap-2.5 border-b border-zinc-800/40 pb-2">
                      {/* Fixed Small Shrunk Icon Badge */}
                      <img 
                        src={profile.avatarUrl} 
                        alt={profile.name} 
                        className="w-10 h-10 rounded-lg border border-zinc-800 bg-[#0c0d0e] object-cover shrink-0" 
                      />
                      <div className="truncate">
                        <h3 className="text-xs font-black tracking-tight text-white truncate leading-tight">{profile.name}</h3>
                        <p className={`text-[10px] font-mono mt-0.5 ${canvasStyles.accentText}`}>@{profile.username}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  {/* SYNTAX TELEMETRY CARD */}
                  <div className={`rounded-xl p-4 border transition-all ${canvasStyles.cardStyle}`}>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 mb-2">Syntax Telemetry</p>
                    <LanguagesBlock languages={statistics.topLanguages} />
                  </div>

                </div>

                {/* 2. RIGHT MAIN CONTENT COLUMN */}
                <div className="lg:col-span-2 flex flex-col gap-5 w-full">
                  
                  {/* STATS PERFORMANCE RECORDROW */}
                  <StatsBlock 
                    totalRepos={statistics.totalProjects} 
                    stars={statistics.totalStars} 
                    followers={profile.followers} 
                  />

                  {/* PUBLIC OPEN SOURCE ECOSYSTEM GRID CARD */}
                  <div className={`rounded-xl p-4 border transition-all ${canvasStyles.cardStyle}`}>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 mb-2">Ecosystem Public Repositories</p>
                    <RepositoriesBlock repos={repositories} />
                  </div>

                </div>

              </div>

              {/* Endorsement Footer bar */}
              <div className="text-center pt-3 border-t border-zinc-800/50 text-[9px] text-zinc-600 flex items-center justify-center gap-1 font-mono tracking-widest">
                <Globe className="w-3 h-3 text-[#15803d]" /> Powered by Buildfolio Engine Pipeline
              </div>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}