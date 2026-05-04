import Link from "next/link";
import { ArrowUpRight, FileUp, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="flex h-20 items-center border-b border-white/10 px-6 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white text-sm font-black text-black">
            P
          </div>
          <span className="text-xl font-semibold tracking-wide">Presona</span>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-xl rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="mb-7 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.28em] text-white/45">
              Operator Dashboard
            </p>
            <h1 className="text-3xl font-semibold text-balance sm:text-4xl">
              Generate a Website
            </h1>
          </div>

          <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed border-violet-400/60 bg-black/30 px-5 py-8 text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white/10">
              <FileUp className="h-6 w-6 text-violet-200" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-white">
              Share the PDF in this Codex chat
            </span>
            <span className="mt-2 max-w-sm text-sm leading-6 text-white/55">
              Attach the resume here, and I will extract the profile content and
              build the website files for the selected client.
            </span>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Waiting for PDF in Chat
          </button>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Clients</h2>
            <span className="text-sm text-white/35">1 site</span>
          </div>
          <Link
            href="/site/saad"
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-300/50 hover:bg-white/[0.06]"
          >
            <div>
              <p className="font-semibold">Saad Ahmed</p>
              <p className="mt-1 text-sm text-white/50">
                Growth & Performance Marketing Leader
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-white/45" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
