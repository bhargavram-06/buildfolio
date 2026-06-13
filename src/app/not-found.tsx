import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0f1011] text-[#f4f4f5] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6 p-8 bg-[#16181a] border border-[#27272a] rounded-2xl shadow-xl">
        <div className="w-12 h-12 bg-[#0f1011] border border-red-900 text-red-500 rounded-xl flex items-center justify-center mx-auto">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight">404 // Profile Index Missing</h1>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            The profile slug you are trying to lookup could not be recovered from our MongoDB Atlas collection cluster. It may not have been synchronized yet.
          </p>
        </div>
        <Link 
          href="/"
          className="inline-block text-xs font-semibold bg-[#15803d] hover:bg-[#166534] text-white px-4 py-2 rounded-lg transition-colors w-full"
        >
          Return to Matrix Dashboard
        </Link>
      </div>
    </main>
  );
}