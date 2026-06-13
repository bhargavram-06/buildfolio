import { connectToDatabase } from "@/lib/mongodb";
import { BentoCard } from "@/components/bento/BentoCard";
import { StatsBlock, LanguagesBlock, RepositoriesBlock } from "@/components/bento/BentoGridItems";
import { notFound } from "next/navigation";
import { FolderGit2, Globe, ShieldCheck } from "lucide-react";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicPortfolioPage({ params }: PublicPortfolioPageProps) {
  const resolvedParams = await params;
  const username = resolvedParams.slug.toLowerCase();

  const db = await connectToDatabase();
  const portfolio = await db.collection("portfolios").findOne({ username });

  if (!portfolio) {
    notFound();
  }

  const { githubData, theme } = portfolio;
  const { profile, repositories, statistics } = githubData;

  // 🎨 THEME CONDITIONAL ROUTER MAP
  let themeStyles = {
    background: "bg-[#0f1011] text-[#f4f4f5]",
    cardStyle: "bg-[#16181a] border-[#27272a]",
    accentText: "text-[#15803d]",
    fontFamily: "font-sans"
  };

  if (theme === "Modern Developer") {
    themeStyles = {
      background: "bg-[#090d16] text-[#e2e8f0]", // Cyber Dark Navy Blue
      cardStyle: "bg-[#111827] border-slate-800/80 shadow-[0_0_15px_rgba(21,128,61,0.1)]", 
      accentText: "text-emerald-400 font-semibold",
      fontFamily: "font-mono" // Tech-savvy Monospace typography
    };
  } else if (theme === "Minimal Professional") {
    themeStyles = {
      background: "bg-[#121212] text-[#fafafa]", // Ultra clean matte black canvas
      cardStyle: "bg-[#1c1c1c] border-zinc-800",
      accentText: "text-zinc-400 border-b border-zinc-700 pb-0.5",
      fontFamily: "font-serif" // Classic corporate editorial appearance
    };
  }

  return (
    <main className={`min-h-screen ${themeStyles.background} ${themeStyles.fontFamily} px-4 py-16 md:px-8 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Verification Top Nav Bar */}
        <div className={`flex items-center justify-between border-b border-zinc-800 pb-6`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#15803d]" />
            <span className="text-sm font-mono tracking-wider font-semibold text-[#a1a1aa]">
              BUILDFOLIO // VERIFIED_PROOF_OF_WORK
            </span>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 text-xs font-medium text-[#a1a1aa] hover:${themeStyles.accentText} bg-[#16181a] border border-zinc-800 px-3 py-1.5 rounded-lg transition-all`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            GitHub Profile
          </a>
        </div>

        {/* Current Active Theme Tracker Badge */}
        <div className="text-right">
          <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-[#15803d] px-2.5 py-1 rounded-md">
            Active Theme: {theme || "Silent Coder"}
          </span>
        </div>

        {/* Master Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Block */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <div className={`rounded-xl p-6 border flex-1 flex flex-col justify-between ${themeStyles.cardStyle}`}>
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500">Developer Context</h3>
                <div className="flex items-center gap-4">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-16 h-16 rounded-xl border border-zinc-800" />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
                    <p className={`text-xs font-mono ${themeStyles.accentText}`}>@{profile.username}</p>
                  </div>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed bg-black/40 p-3 rounded-lg border border-zinc-800/60">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className={`rounded-xl p-6 border ${themeStyles.cardStyle}`}>
              <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-4">Syntax Telemetry</h3>
              {statistics.topLanguages && statistics.topLanguages.length > 0 ? (
                <LanguagesBlock languages={statistics.topLanguages} />
              ) : (
                <p className="text-xs text-[#a1a1aa] italic">No codebase metrics recorded.</p>
              )}
            </div>
          </div>

          {/* Right Metrics Block */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <StatsBlock totalRepos={statistics.totalProjects} stars={statistics.totalStars} followers={profile.followers} />

            <div className={`rounded-xl p-6 border flex-1 flex flex-col justify-between ${themeStyles.cardStyle}`}>
              <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-4">Public Repository Ecosystem</h3>
                <RepositoriesBlock repos={repositories} />
              </div>
            </div>
          </div>

        </div>

        <footer className="text-center pt-8 border-t border-zinc-800 text-xs text-zinc-600 flex items-center justify-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#15803d]" /> Powered by Buildfolio Portfolio Engine
        </footer>
      </div>
    </main>
  );
}