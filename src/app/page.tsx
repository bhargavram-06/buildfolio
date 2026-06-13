export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-[var(--card)] border border-[var(--muted)] text-[var(--primary)]">
          ✨ Buildfolio Sprint Active
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Where Code Becomes <span className="text-[var(--primary)]">Credibility</span>
        </h1>
        <p className="text-[var(--muted-foreground)] text-lg">
          Automatically transforming real-time GitHub activities into professional portfolio showcases.
        </p>
      </div>
    </main>
  );
}