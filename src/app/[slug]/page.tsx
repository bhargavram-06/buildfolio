import { connectToDatabase } from "@/lib/mongodb";
import { BentoCard } from "@/components/bento/BentoCard";
import { StatsBlock, LanguagesBlock, RepositoriesBlock } from "@/components/bento/BentoGridItems";
import { notFound } from "next/navigation";
import { FolderGit2, Globe, ShieldCheck } from "lucide-react";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }>;
}

// Server Component that fetches data directly from MongoDB Atlas
export default async function PublicPortfolioPage({ params }: PublicPortfolioPageProps) {
  const resolvedParams = await params;
  const username = resolvedParams.slug.toLowerCase();

  const db = await connectToDatabase();
  const portfolio = await db.collection("portfolios").findOne({ username });

  // If the developer hasn't created a profile on your app yet, throw a 404
  if (!portfolio) {
    notFound();
  }

  const { githubData, theme } = portfolio;
  const { profile, repositories, statistics } = githubData;

  return (
    <main className="min-h-screen bg-[#0f1011] text-[#f4f4f5] px-4 py-16 md:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Verification Top Nav Bar */}
        <div className="flex items-center justify-between border-b border-[#27272a] pb-6">
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
            className="inline-flex items-center gap-2 text-xs font-medium text-[#a1a1aa] hover:text-[#15803d] bg-[#16181a] border border-[#27272a] px-3 py-1.5 rounded-lg transition-all"
          >
            {/* Fixed: Changed from <Github /> to <FolderGit2 /> */}
            <FolderGit2 className="w-3.5 h-3.5" />
            GitHub Profile
          </a>
        </div>

        {/* Layout Engine Style Swapping Notice */}
        <div className="text-right">
          <span className="text-[10px] font-mono bg-[#16181a] border border-[#27272a] text-[#15803d] px-2.5 py-1 rounded-md">
            Rendered Theme: {theme || "Silent Coder"}
          </span>
        </div>

        {/* Master Bento Display Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Identity Column */}
          <div className="lg:col-span-1 space-y-6 flex flex-col">
            <BentoCard className="flex-1" title="Developer Context">
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-16 h-16 rounded-xl border border-[#27272a] bg-[#0f1011]"
                  />
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#f4f4f5]">{profile.name}</h2>
                    <p className="text-xs font-mono text-[#15803d]">@{profile.username}</p>
                  </div>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed bg-[#0f1011] p-3 rounded-lg border border-[#27272a]">
                  {profile.bio}
                </p>
              </div>
            </BentoCard>

            <BentoCard title="Syntax Telemetry">
              <div className="mt-2">
                {statistics.topLanguages && statistics.topLanguages.length > 0 ? (
                  <LanguagesBlock languages={statistics.topLanguages} />
                ) : (
                  <p className="text-xs text-[#a1a1aa] italic">No codebase metrics recorded.</p>
                )}
              </div>
            </BentoCard>
          </div>

          {/* Code Repository Metrics Column */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <StatsBlock 
              totalRepos={statistics.totalProjects} 
              stars={statistics.totalStars} 
              followers={profile.followers} 
            />

            <BentoCard className="flex-1" title="Public Repository Ecosystem">
              <div className="mt-2">
                <RepositoriesBlock repos={repositories} />
              </div>
            </BentoCard>
          </div>

        </div>

        {/* Footnote Brand Endorsement */}
        <footer className="text-center pt-8 border-t border-[#27272a] text-xs text-zinc-600 flex items-center justify-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#15803d]" /> Powered by Buildfolio Portfolio Engine
        </footer>
      </div>
    </main>
  );
}