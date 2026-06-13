"use client";

import { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { StatsBlock, LanguagesBlock, RepositoriesBlock } from "@/components/bento/BentoGridItems";
import { Search, Palette, CloudUpload, FolderGit2, CheckCircle, ExternalLink, ShieldCheck, Globe, LayoutGrid } from "lucide-react";
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

  const [canvasStyles, setCanvasStyles] = useState({
    background: "#111214",
    textColor: "#f4f4f5",
    cardBg: "#16181a",
    cardBorder: "#222326",
    accentColor: "#15803d"
  });

  useEffect(() => {
    if (theme === "Modern Developer") {
      setCanvasStyles({
        background: "#090d16",
        textColor: "#e2e8f0",
        cardBg: "#111827",
        cardBorder: "rgba(16,185,129,0.2)",
        accentColor: "#34d399"
      });
    } else if (theme === "Minimal Professional") {
      setCanvasStyles({
        background: "#121212",
        textColor: "#fafafa",
        cardBg: "#1c1c1c",
        cardBorder: "#3f3f46",
        accentColor: "#a1a1aa"
      });
    } else {
      setCanvasStyles({
        background: "#111214",
        textColor: "#f4f4f5",
        cardBg: "#16181a",
        cardBorder: "#222326",
        accentColor: "#15803d"
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
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0c0d", color: "#f4f4f5", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      
      {/* 🧭 NAVIGATION DECK CONTROL BAR */}
      <nav style={{ width: "100%", backgroundColor: "#111214", borderBottom: "1px solid #222326", padding: "12px 24px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#15803d" }} />
            <span style={{ fontSize: "12px", fontWeight: "900", letterSpacing: "0.1em", color: "#ffffff" }}>BUILDFOLIO STUDIO</span>
          </div>

          <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#16181a", border: "1px solid #27272a", borderRadius: "8px", padding: "4px 8px" }}>
            <FolderGit2 style={{ width: "14px", height: "14px", color: "#15803d" }} />
            <input
              type="text"
              placeholder="Compile public GitHub username handle..."
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              disabled={isLoading}
              style={{ backgroundColor: "transparent", border: "none", outline: "none", fontSize: "12px", color: "#ffffff", width: "240px" }}
            />
            <button type="submit" style={{ backgroundColor: "#15803d", border: "none", color: "#ffffff", fontWeight: "bold", fontSize: "11px", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}>
              {isLoading ? "Syncing..." : "Generate"}
            </button>
          </form>
        </div>
      </nav>

      {/* 💼 STATUS NOTIFICATIONS BAR */}
      <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "16px 24px 0 24px", boxSizing: "border-box" }}>
        {generatedLink && (
          <div style={{ width: "100%", backgroundColor: "#111612", border: "1px solid rgba(21,128,61,0.3)", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <CheckCircle style={{ width: "18px", height: "18px", color: "#10b981", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "11px", fontWeight: "bold", color: "#ffffff", margin: 0, textTransform: "uppercase" }}>Portfolio Synced Online</p>
                <p style={{ fontSize: "11px", color: "#a1a1aa", fontFamily: "monospace", margin: "2px 0 0 0" }}>{generatedLink}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => { navigator.clipboard.writeText(generatedLink); alert("Copied!"); }} style={{ backgroundColor: "#27272a", border: "none", color: "#ffffff", fontSize: "11px", fontWeight: "bold", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}>Copy URL</button>
              <Link href={`/${profile?.username.toLowerCase()}`} target="_blank" style={{ backgroundColor: "#15803d", color: "#ffffff", textDecoration: "none", fontSize: "11px", fontWeight: "bold", padding: "6px 12px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" }}>View Page <ExternalLink style={{ width: "12px", height: "12px" }} /></Link>
            </div>
          </div>
        )}

        {error && (
          <div style={{ width: "100%", backgroundColor: "#3f1a1a", border: "1px solid #7f1d1d", color: "#f87171", padding: "12px", borderRadius: "12px", fontSize: "12px", textAlign: "center", fontWeight: "600" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Theme Modifiers Deck */}
        {profile && !isLoading && (
          <div style={{ width: "100%", backgroundColor: "#121315", border: "1px solid #222326", borderRadius: "12px", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "bold", color: "#ffffff", textTransform: "uppercase" }}>
                <Palette style={{ width: "14px", height: "14px", color: "#15803d" }} />
                <span>Theme Matrix Mixer:</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {(["Silent Coder", "Modern Developer", "Minimal Professional"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    style={{ backgroundColor: theme === t ? "#15803d" : "#1e2022", color: "#ffffff", border: theme === t ? "1px solid #15803d" : "1px solid #3a3f47", fontSize: "11px", fontWeight: "bold", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handlePublish} disabled={saveStatus === "saving"} style={{ backgroundColor: "#15803d", color: "#ffffff", border: "none", fontSize: "11px", fontWeight: "bold", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              <CloudUpload style={{ width: "14px", height: "14px" }} />
              {saveStatus === "saving" ? "Saving..." : "Publish Portfolio Setup"}
            </button>
          </div>
        )}
      </div>

      {/* 🖼️ CORE LIVE VIEW PREVIEW CANVAS DISPLAY */}
      <div style={{ maxWidth: "1100px", width: "100%", margin: "16px auto 0 auto", padding: "0 24px 48px 24px", flex: "1", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
        
        {!profile && !isLoading && (
          <div style={{ textAlign: "center", margin: "auto", padding: "64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <LayoutGrid style={{ width: "32px", height: "32px", color: "#27272a" }} />
            <h3 style={{ fontSize: "12px", fontWeight: "bold", color: "#ffffff", textTransform: "uppercase", margin: 0 }}>Workspace Blueprint Empty</h3>
            <p style={{ fontSize: "11px", color: "#71717a", margin: 0 }}>Input a public user parameter handle in the navigation deck to compile codebase metrics.</p>
          </div>
        )}

        {isLoading && (
          <div style={{ textAlign: "center", margin: "auto", padding: "64px 0" }}>
            <p style={{ fontSize: "11px", color: "#a1a1aa", fontFamily: "monospace", letterSpacing: "0.1em" }}>EXTRACTING DEVELOPER TELEMETRY CHANNELS...</p>
          </div>
        )}

        {profile && !isLoading && statistics && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <p style={{ fontSize: "11px", fontWeight: "bold", color: "#a1a1aa", textTransform: "uppercase", margin: 0, borderLeft: "2px solid #15803d", paddingLeft: "8px" }}>
              Live Workspace Canvas Screen View
            </p>

            {/* LIVE DYNAMIC SYSTEM WRAPPER CONTAINER BLOCK */}
            <div style={{ backgroundColor: canvasStyles.background, color: canvasStyles.textColor, border: "1px solid #222326", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
              
              {/* Internal Info bar */}
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", fontSize: "10px", fontFamily: "monospace", fontWeight: "bold", color: "#71717a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck style={{ width: "14px", height: "14px", color: "#15803d" }} />
                  <span>BUILDFOLIO // VERIFIED_PROOF_OF_WORK</span>
                </div>
                <span style={{ backgroundColor: "#0f1011", color: "#15803d", border: "1px solid #27272a", padding: "1px 6px", borderRadius: "4px" }}>{theme}</span>
              </div>

              {/* TWO-COLUMN GRID ROW LAYOUT */}
              <div style={{ display: "flex", gap: "20px", flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: "flex-start" }}>
                
                {/* COLUMN LEFT: Tight Sidebar Blocks */}
                <div style={{ flex: "1", minWidth: "280px", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  {/* DEVELOPER CONTEXT COMPACT BADGE */}
                  <div style={{ backgroundColor: canvasStyles.cardBg, border: `1px solid ${canvasStyles.cardBorder}`, borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p style={{ fontSize: "10px", color: "#71717a", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>Developer Context</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      
                      {/* FIXED BOX CONSTRAINT FOR IMAGE AVATAR */}
                      <div style={{ width: "44px", height: "44px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0c0d0e", flexShrink: 0 }}>
                        <img src={profile.avatarUrl} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      
                      <div style={{ overflow: "hidden" }}>
                        <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profile.name}</h3>
                        <p style={{ fontSize: "11px", color: canvasStyles.accentColor, fontFamily: "monospace", margin: "2px 0 0 0" }}>@{profile.username}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "11px", color: "#a1a1aa", margin: 0, backgroundColor: "rgba(0,0,0,0.2)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)", lineHeight: "1.5" }}>
                      {profile.bio}
                    </p>
                  </div>

                  {/* SYNTAX BREAKDOWN CARD */}
                  <div style={{ backgroundColor: canvasStyles.cardBg, border: `1px solid ${canvasStyles.cardBorder}`, borderRadius: "12px", padding: "16px" }}>
                    <p style={{ fontSize: "10px", color: "#71717a", fontWeight: "bold", textTransform: "uppercase", margin: "0 0 12px 0" }}>Syntax Telemetry</p>
                    <LanguagesBlock languages={statistics.topLanguages} />
                  </div>

                </div>

                {/* COLUMN RIGHT: Main Wide Workspace Content */}
                <div style={{ flex: "2", minWidth: "320px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <StatsBlock totalRepos={statistics.totalProjects} stars={statistics.totalStars} followers={profile.followers} />

                  <div style={{ backgroundColor: canvasStyles.cardBg, border: `1px solid ${canvasStyles.cardBorder}`, borderRadius: "12px", padding: "16px" }}>
                    <p style={{ fontSize: "10px", color: "#71717a", fontWeight: "bold", textTransform: "uppercase", margin: "0 0 12px 0" }}>Ecosystem Public Repositories</p>
                    <RepositoriesBlock repos={repositories} />
                  </div>
                </div>

              </div>

              {/* Endorsement Footer */}
              <div style={{ textAlign: "center", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: "9px", color: "#52525b", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontFamily: "monospace", letterSpacing: "0.05em" }}>
                <Globe style={{ width: "12px", height: "12px", color: "#15803d" }} />
                <span>POWERED BY BUILDFOLIO ENGINE PIPELINE</span>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}