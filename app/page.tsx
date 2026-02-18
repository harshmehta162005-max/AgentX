"use client";

import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, Fingerprint, Radar, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const steps = [
  {
    id: "01",
    title: "Sketch The Logic",
    copy: "Draw the decision graph first. Connect tools, conditions, and approvals in one map.",
  },
  {
    id: "02",
    title: "Simulate The Agent",
    copy: "Run scenarios with live traces to validate behavior before exposing any endpoint.",
  },
  {
    id: "03",
    title: "Deploy With Control",
    copy: "Publish production-safe agents with auditable flows and human override points.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[--bg] text-[--fg]">
      <div className="backdrop-grid pointer-events-none absolute inset-0" />
      <div className="backdrop-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 lg:px-12">
        <header className="topbar flex items-center justify-between rounded-2xl border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">AgentX</p>
              <h1 className="text-lg font-semibold">Agent Builder Platform</h1>
            </div>
          </div>
          <ThemeToggle className="h-10 rounded-xl bg-white/90 dark:bg-slate-900/90" />
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="hero-shell relative overflow-hidden rounded-3xl border p-8 sm:p-11">
            <div className="hero-line absolute left-0 top-0 h-1 w-56" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
              AI agents, made simple
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.01] tracking-tight sm:text-6xl">
              Create AI agents that  
              <span className="ml-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                 think, decide, and act
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Build, customize, and deploy AI agents in minutes.

              Automate workflows, connect tools, and scale intelligence without complexity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100"
              >
                Create Your First Agent
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/my-agents"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                View Existing Agents
              </Link>
            </div>
          </article>

          <aside className="orbit-shell relative overflow-hidden rounded-3xl border p-6">
            <div className="orbit-center absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="orbit orbit-1 absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="orbit orbit-2 absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full" />

            <div className="relative z-10 space-y-3">
              <Badge icon={BrainCircuit} text="Smart Decision Making" />
              <Badge icon={Fingerprint} text="Tool Connections" />
              <Badge icon={Radar} text="Live Monitoring" />
              <Badge icon={Sparkles} text="Adaptive Actions" />
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">Operational Blueprint</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              From idea to production
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">
                  {step.id}
                </p>
                <h4 className="mt-2 text-base font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx global>{`
        :root {
          --bg: #eef4ff;
          --fg: #0f172a;
        }

        .dark {
          --bg: #020617;
          --fg: #e2e8f0;
        }

        .backdrop-grid {
          background-image:
            linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 36%, #000 34%, transparent 88%);
        }

        .dark .backdrop-grid {
          background-image:
            linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
        }

        .backdrop-glow {
          background:
            radial-gradient(circle at 12% 10%, rgba(6, 182, 212, 0.25), transparent 30%),
            radial-gradient(circle at 86% 18%, rgba(16, 185, 129, 0.24), transparent 30%),
            radial-gradient(circle at 50% 100%, rgba(14, 165, 233, 0.18), transparent 36%);
        }

        .topbar,
        .hero-shell,
        .orbit-shell {
          border-color: rgba(148, 163, 184, 0.3);
          background: linear-gradient(155deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.75));
          box-shadow: 0 12px 38px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(11px);
        }

        .dark .topbar,
        .dark .hero-shell,
        .dark .orbit-shell {
          border-color: rgba(71, 85, 105, 0.6);
          background: linear-gradient(155deg, rgba(15, 23, 42, 0.84), rgba(2, 6, 23, 0.78));
          box-shadow: 0 18px 42px rgba(2, 6, 23, 0.5);
        }

        .hero-line {
          background: linear-gradient(to right, #06b6d4, #0ea5e9, transparent);
        }

        .orbit {
          border: 1px solid rgba(56, 189, 248, 0.35);
          animation: spin 20s linear infinite;
        }

        .orbit-2 {
          animation-duration: 30s;
          animation-direction: reverse;
        }

        .orbit-center {
          background: radial-gradient(circle, rgba(14, 165, 233, 0.35), transparent 68%);
          filter: blur(4px);
        }

        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}

function Badge({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/75">
      <div className="rounded-lg bg-slate-900 p-1.5 text-white dark:bg-slate-100 dark:text-slate-900">
        <Icon size={14} />
      </div>
      <span>{text}</span>
    </div>
  );
}
