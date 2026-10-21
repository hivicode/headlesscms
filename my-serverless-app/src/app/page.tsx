import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Layers,
  Sparkles,
  Database,
  Cloud,
  Zap,
  ShieldCheck,
  PlusCircle,
  FileCheck2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between overflow-hidden">
      {/* Dynamic ambient gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top minimalistic header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-md bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-bold text-base tracking-tight">CloudTask Pro</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/tasks">
              <Button variant="ghost" size="sm" className="text-xs font-medium">
                Masuk Dashboard
              </Button>
            </Link>
            <Link href="/tasks">
              <Button size="sm" className="text-xs font-semibold shadow-sm">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Milestone Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium backdrop-blur-md shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>The Serverless Odyssey • Minggu 02 (Mutasi Data Server Action)</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Arsitektur{" "}
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Serverless Odyssey
              </span>{" "}
              dengan React 19 Actions
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
              Platform orkestrasi perkuliahan modern berbasis Next.js 16 App Router, React 19 Server Actions,
              validasi defensif Zod, PostgreSQL Supabase terkelola, Cloudinary CDN, dan Vercel Edge.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/tasks">
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold px-8 py-6 text-sm group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Buka Form Pembuatan Tugas</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-semibold px-8 py-6 text-sm border-border hover:bg-muted/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <FileCheck2 className="mr-2 h-4 w-4 text-primary" />
                <span>Lihat Dashboard & Metrik</span>
              </Button>
            </Link>
          </div>

          {/* 4 Pillars Highlight */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-left space-y-1.5 transition-all hover:border-primary/40 hover:bg-card">
              <div className="h-8 w-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-primary">
                <Layers className="h-4 w-4" />
              </div>
              <p className="font-semibold text-sm">React 19 Actions</p>
              <p className="text-xs text-muted-foreground">Mutasi data via useActionState tanpa API Route manual.</p>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-left space-y-1.5 transition-all hover:border-emerald-500/40 hover:bg-card">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Database className="h-4 w-4" />
              </div>
              <p className="font-semibold text-sm">Supabase Cloud</p>
              <p className="text-xs text-muted-foreground">PostgreSQL terkelola & Row Level Security terintegrasi.</p>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-left space-y-1.5 transition-all hover:border-indigo-500/40 hover:bg-card">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Cloud className="h-4 w-4" />
              </div>
              <p className="font-semibold text-sm">Cloudinary CDN</p>
              <p className="text-xs text-muted-foreground">Transformasi on-the-fly & kompresi media generasi baru.</p>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-left space-y-1.5 transition-all hover:border-primary/40 hover:bg-card">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <p className="font-semibold text-sm">Zod Validation</p>
              <p className="text-xs text-muted-foreground">Validasi defensif schema-first di lingkungan server aman.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        The Serverless Odyssey • Built with Next.js 16 App Router, React 19 & Shadcn UI
      </footer>
    </div>
  );
}
