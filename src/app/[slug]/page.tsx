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

  // Set default modern sleek look
  let themeStyles = {
    background: "bg-[#0b0c0d] text-[#f4f4f5]",
    cardStyle: "bg-[#121315] border-[#222326]",
    accentText: "text-[#15803d]"
  };

  if (theme === "Modern Developer") {
    themeStyles = {
      background: "bg-[#090d16] text-[#e2e8f0]",
      cardStyle: "bg-[#111827] border-slate-800/60 shadow-[0_0_15px_rgba(21,128,61,0.05)]",
      accentText: "text-emerald-400"
    };
  } else if (theme === "Minimal Professional") {
    themeStyles = {
      background: "bg-[#121212] text-[#fafafa]",
      cardStyle: "bg-[#1c1c1c] border-zinc-800",
      accentText: "text-zinc-400"
    };
  }

  return (
    <main className={`min-h-screen ${themeStyles.background} px-4 py-8 md:py-16 antialiased`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Verification Bar */}
        <div className="flex items-center justify-between border-b border-[#222326] pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15803d]" />
            <span className="text-xs font-mono font-bold tracking-wider text-zinc-400">
              BUILDFOLIO // PROOF_OF_WORK
            </span>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#15803d]" /> GitHub
          </a>
        </div>

        {/* Core Layout Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Stack: Profile and Tech Data */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className={`rounded-xl p-5 border ${themeStyles.cardStyle} space-y-4`}>
              <div className="flex items-center gap-3">
                {/* Fixed Image Dimension Constraints */}
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="w-12 h-12 rounded-xl border border-[#222326] bg-[#0b0c0d] shrink-0" 
                />
                <div className="truncate">
                  <h2 className="text-sm font-bold tracking-tight text-white truncate">{profile.name}</h2>
                  <p className={`text-xs font-mono ${themeStyles.accentText}`}>@{profile.username}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 bg-[#0b0c0d]/60 p-3 rounded-lg border border-[#222326]/60 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            <div className={`rounded-xl p-5 border ${themeStyles.cardStyle}`}>
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">Syntax Breakdown</h3>
              <LanguagesBlock languages={statistics.topLanguages} />
            </div>
          </div>

          {/* Right Stack: Quantifiable Stats and Code Repositories */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <StatsBlock 
              totalRepos={statistics.totalProjects} 
              stars={statistics.totalStars} 
              followers={profile.followers} 
            />

            <div className={`rounded-xl p-5 border ${themeStyles.cardStyle}`}>
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-3">Ecosystem Repositories</h3>
              <RepositoriesBlock repos={repositories} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-[#222326] text-[10px] text-zinc-600 flex items-center justify-center gap-1 font-mono">
          <Globe className="w-3 h-3 text-[#15803d]" /> GENERATED VIA BUILDFOLIO ENGINE
        </footer>
      </div>
    </main>
  );
}