import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskStatusFilter } from "@/components/task-status-filter";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import {
  ListTodo,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  status: "Selesai" | "Berjalan";
  xp: number;
  description: string;
  dueDate: string;
}

export default async function TasksPage() {
  // Data fetch di Server Component (0 KB JS transfer ke browser!)
  const tasks: TaskItem[] = [
    {
      id: "1",
      title: "Inisialisasi Fondasi Next.js 16 & DevSecOps Git",
      category: "Infrastruktur",
      status: "Selesai",
      xp: 150,
      description: "Pengaturan gitignore komprehensif, template .env.example, dan konfigurasi Turbopack.",
      dueDate: "Minggu 01",
    },
    {
      id: "2",
      title: "Setup Database PostgreSQL Supabase & RLS Policies",
      category: "Cloud Database",
      status: "Selesai",
      xp: 200,
      description: "Penyusunan skema relasional, indeks performa, dan aturan isolasi Row Level Security.",
      dueDate: "Minggu 02",
    },
    {
      id: "3",
      title: "Integrasi Media Storage & Cloudinary Pipeline",
      category: "Media CDN",
      status: "Berjalan",
      xp: 250,
      description: "Implementasi upload preset aman, transformasi WebP/AVIF on-the-fly di sisi CDN.",
      dueDate: "Minggu 03",
    },
    {
      id: "4",
      title: "Orkestrasi Deployment Edge Serverless di Vercel",
      category: "Edge Computing",
      status: "Berjalan",
      xp: 300,
      description: "Optimasi Cold-Start, Server Actions terdistribusi, dan automated branch previews.",
      dueDate: "Minggu 04",
    },
  ];

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === "Berjalan").length;
  const completedTasks = tasks.filter((t) => t.status === "Selesai").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Context Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5" />
          <span>The Serverless Odyssey Dashboard</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Modul Manajemen & Mutasi Data Tugas</h1>
        <p className="text-sm text-muted-foreground">
          Kelola progres tugas kuliah secara real-time dengan React 19 Server Actions & Zod defensive validation.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create Task Form (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <CreateTaskForm />
        </div>

        {/* Right Column: Metrics & Tasks List */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metric 1 */}
            <Card className="border border-border/70 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Total</span>
                  <div className="text-xl font-bold tracking-tight">{totalTasks} Tugas</div>
                </div>
                <div className="h-9 w-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <ListTodo className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            {/* Metric 2 */}
            <Card className="border border-border/70 bg-card/60 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Berjalan</span>
                  <div className="text-xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
                    {inProgressTasks}
                  </div>
                </div>
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            {/* Metric 3 */}
            <Card className="border border-border/70 bg-card/60 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Selesai</span>
                  <div className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                    {completionRate}%
                  </div>
                </div>
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Bar: Filter */}
          <div className="flex items-center justify-between pt-1">
            <h2 className="text-sm font-bold tracking-tight text-foreground">Daftar Modul Terjadwal</h2>
            <TaskStatusFilter
              initialCounts={{
                all: totalTasks,
                in_progress: inProgressTasks,
                completed: completedTasks,
              }}
            />
          </div>

          {/* Tasks List */}
          <div className="space-y-3.5">
            {tasks.map((task) => {
              const isCompleted = task.status === "Selesai";
              return (
                <Link key={task.id} href={`/tasks/${task.id}`} className="group block focus:outline-none">
                  <Card className="border border-border/80 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/50 relative overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          {task.category}
                        </span>
                        <Badge
                          variant={isCompleted ? "default" : "secondary"}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isCompleted
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {task.status}
                        </Badge>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {task.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0 space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {task.description}
                      </p>

                      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-primary font-semibold">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>+{task.xp} XP Reward</span>
                        </div>

                        <div className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors font-medium text-[11px]">
                          <span>{task.dueDate}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
