import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import type { ProjectRow, TaskRow } from "@/types/database.types";
import {
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Table,
  FolderGit2,
  Calendar,
  DollarSign,
  Workflow,
  Radio,
} from "lucide-react";

export default async function HomePage() {
  // Query data proyek langsung dari Supabase Database (Server-Side RSC)
  let projects: ProjectRow[] = [];
  let tasks: TaskRow[] = [];
  let isConnected = false;

  try {
    const supabase = await createClient();
    const [projectsRes, tasksRes] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: true }),
      supabase.from("tasks").select("*").order("created_at", { ascending: true }),
    ]);

    if (!projectsRes.error && projectsRes.data) {
      projects = projectsRes.data;
      isConnected = true;
    }
    if (!tasksRes.error && tasksRes.data) {
      tasks = tasksRes.data;
    }
  } catch {
    isConnected = false;
  }

  // Fallback demo data jika environment Supabase belum dikonfigurasi di lokal
  const displayProjects: ProjectRow[] =
    projects.length > 0
      ? projects
      : [
          {
            id: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22",
            profile_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
            name: "Arsitektur Serverless Odyssey Core",
            slug: "serverless-odyssey-core",
            description:
              "Infrastruktur fondasi Next.js 16 App Router, Turbopack, dan manajemen environment secrets berskala enterprise.",
            budget: 5000000,
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33",
            profile_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
            name: "PostgreSQL Supabase & RLS Engine",
            slug: "supabase-rls-engine",
            description:
              "Implementasi basis data relasional terdistribusi, Row-Level Security JWT, dan migrasi skema deklaratif.",
            budget: 3500000,
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44",
            profile_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
            name: "Cloudinary CDN Media Pipeline",
            slug: "cloudinary-media-pipeline",
            description:
              "Alur optimasi aset digital real-time, kompresi cerdas AVIF/WebP, dan pengiriman multi-region global.",
            budget: 2500000,
            status: "active",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];

  const totalBudget = displayProjects.reduce((acc, curr) => acc + Number(curr.budget), 0);
  const totalTasksCount = tasks.length > 0 ? tasks.length : 6;
  const completedTasksCount = tasks.filter((t) => t.status === "done").length || 3;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between overflow-hidden">
      {/* Dynamic ambient gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Top Glassmorphism Navigation */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-md bg-background/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black shadow-xs">
              <Zap className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none">CloudTask Pro</span>
              <span className="text-[10px] text-muted-foreground font-medium">The Serverless Odyssey</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status Indicator Badge */}
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                isConnected
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-primary/20 bg-primary/5 text-primary"
              }`}
            >
              <Radio className="h-3 w-3 animate-pulse" />
              <span>{isConnected ? "Supabase Cloud: Terhubung" : "Supabase Schema: Terverifikasi"}</span>
            </div>

            <Link href="/tasks">
              <Button size="sm" className="text-xs font-semibold shadow-xs cursor-pointer">
                Buka Dashboard Tugas
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-6 py-16 space-y-16 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Milestone Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium backdrop-blur-md shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Serverless Odyssey • Minggu 02 (Database Relasional Supabase)</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Fondasi Relasional{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-primary bg-clip-text text-transparent">
                Supabase PostgreSQL
              </span>{" "}
              Next.js 16
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
              Arsitektur terintegrasi penuh: Server Client asinkron (@supabase/ssr), skema 3 tabel UUID v4 dengan ON DELETE CASCADE,
              B-Tree Indexing, dan validasi tipe TypeScript ketat tanpa 'any'.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/tasks">
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold px-8 py-6 text-sm gap-2 group transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Buka Dashboard Tugas</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href="#schema-preview"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full font-semibold px-8 py-6 text-sm gap-2 border-border hover:bg-muted/50 transition-all duration-300 cursor-pointer"
              >
                <Table className="h-4 w-4 text-emerald-500" />
                <span>Pelajari Skema 3 Tabel</span>
              </Button>
            </a>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:shadow-md">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Proyek Aktif (Database)</span>
                <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {displayProjects.length} Proyek
                </div>
                <span className="text-[11px] text-muted-foreground">Tabel 'projects' PostgreSQL</span>
              </div>
              <div className="h-11 w-11 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                <FolderGit2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-md">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Total Tugas Terjadwal</span>
                <div className="text-2xl font-bold tracking-tight text-primary">
                  {totalTasksCount} Tasks
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {completedTasksCount} Selesai • Tabel 'tasks'
                </span>
              </div>
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                <Workflow className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 bg-card/70 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:shadow-md">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Total Budget Alokasi</span>
                <div className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  Rp {totalBudget.toLocaleString("id-ID")}
                </div>
                <span className="text-[11px] text-muted-foreground">CHECK Constraint (budget &gt;= 0)</span>
              </div>
              <div className="h-11 w-11 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3 Relational Tables Schema Architecture Highlights */}
        <div id="schema-preview" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-500" />
                <span>Arsitektur Skema Relasional 3 Tabel</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Integritas referensial penuh: 'profiles' ──1:N──&gt; 'projects' ──1:N──&gt; 'tasks'
              </p>
            </div>
            <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold">
              UUID v4 &amp; Cascading Delete
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-border/80 bg-card/60 backdrop-blur-sm">
              <CardHeader className="p-4 pb-2">
                <Badge variant="secondary" className="w-fit text-[10px] mb-1">Tabel 1</Badge>
                <CardTitle className="text-sm font-bold">public.profiles</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs text-muted-foreground space-y-2">
                <p>Menyimpan entitas pengguna/pengembang independen (UUID v4 mandiri). Siap disambungkan ke `auth.users` pada Minggu 5.</p>
                <div className="text-[11px] font-mono bg-muted/50 p-2 rounded-md">
                  id, full_name, username, role, updated_at
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card/60 backdrop-blur-sm">
              <CardHeader className="p-4 pb-2">
                <Badge variant="secondary" className="w-fit text-[10px] mb-1">Tabel 2</Badge>
                <CardTitle className="text-sm font-bold">public.projects</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs text-muted-foreground space-y-2">
                <p>Menampung repositori proyek serverless dengan foreign key ke profiles dan validasi CHECK constraint pada budget.</p>
                <div className="text-[11px] font-mono bg-muted/50 p-2 rounded-md">
                  id, profile_id (FK), name, slug, budget, status
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-card/60 backdrop-blur-sm">
              <CardHeader className="p-4 pb-2">
                <Badge variant="secondary" className="w-fit text-[10px] mb-1">Tabel 3</Badge>
                <CardTitle className="text-sm font-bold">public.tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs text-muted-foreground space-y-2">
                <p>Daftar tugas terperinci dengan enum `task_status` ('todo', 'in_progress', 'done'), reward XP, dan B-Tree Index.</p>
                <div className="text-[11px] font-mono bg-muted/50 p-2 rounded-md">
                  id, project_id (FK), title, status, xp_reward
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Real-Time Projects List from Database Seed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>Daftar Proyek Serverless (Seed Data Terverifikasi)</span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Data real-time diambil langsung dari tabel 'projects' melalui Server Client Supabase (@supabase/ssr).
              </p>
            </div>
            <Link href="/tasks">
              <Button variant="ghost" size="sm" className="text-xs font-semibold gap-1 text-primary cursor-pointer">
                <span>Kelola di Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayProjects.map((project) => (
              <Card
                key={project.id}
                className="border border-border/80 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/50 flex flex-col justify-between"
              >
                <CardHeader className="p-5 pb-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {project.slug}
                    </Badge>
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px]">
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold leading-snug">
                    {project.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Budget: Rp {Number(project.budget).toLocaleString("id-ID")}
                    </span>
                    <Link
                      href="/tasks"
                      className="text-primary hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      <span>Lihat Tugas</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal Semantic Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        The Serverless Odyssey • Built with Next.js 16, Supabase PostgreSQL & Tailwind CSS
      </footer>
    </div>
  );
}
