import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface TaskDetail {
  id: string;
  title: string;
  category: string;
  status: "Selesai" | "Berjalan";
  xp: number;
  dueDate: string;
  architecturePillar: string;
  summary: string;
  keyDeliverables: string[];
  securityNote: string;
}

const TASKS_REPOSITORY: Record<string, TaskDetail> = {
  "1": {
    id: "1",
    title: "Inisialisasi Fondasi Next.js 16 & DevSecOps Git",
    category: "Infrastruktur",
    status: "Selesai",
    xp: 150,
    dueDate: "Minggu 01",
    architecturePillar: "Next.js 16 & DevSecOps",
    summary:
      "Membangun repositori git dengan standar keamanan tingkat tinggi, isolasi berkas sensitif, dan penegakan struktur Route Groups App Router Next.js 16.",
    keyDeliverables: [
      "Inisialisasi Next.js 16 App Router dengan TypeScript & Turbopack",
      "Penyusunan .gitignore komprehensif tanpa secret leaks",
      "Template publik .env.example untuk konfigurasi Supabase & Cloudinary",
      "Dokumentasi resmi README.md dengan diagram arsitektur 4 pilar",
    ],
    securityNote:
      "Seluruh berkas kredensial (.env, .env.local) telah diverifikasi terblokir dari commit publik.",
  },
  "2": {
    id: "2",
    title: "Setup Database PostgreSQL Supabase & RLS Policies",
    category: "Cloud Database",
    status: "Selesai",
    xp: 200,
    dueDate: "Minggu 02",
    architecturePillar: "Supabase Cloud Database",
    summary:
      "Perancangan skema relasional di PostgreSQL Supabase dengan penegakan Row Level Security (RLS) untuk membatasi akses data pada level basis data.",
    keyDeliverables: [
      "Migrasi tabel tugas dengan tipe data terstruktur dan UUID primary key",
      "Penerapan RLS Policy berbasis JWT Supabase Auth",
      "Optimasi query dengan indeks Postgres terisolasi",
    ],
    securityNote:
      "Kunci SUPABASE_SERVICE_ROLE_KEY hanya boleh dipanggil pada Server Actions atau Route Handlers di sisi server.",
  },
  "3": {
    id: "3",
    title: "Integrasi Media Storage & Cloudinary Pipeline",
    category: "Media CDN",
    status: "Berjalan",
    xp: 250,
    dueDate: "Minggu 03",
    architecturePillar: "Cloudinary CDN",
    summary:
      "Membangun alur unggah media tanpa server dengan signed preset Cloudinary serta kompresi otomatis WebP/AVIF.",
    keyDeliverables: [
      "Setup unsigned upload preset aman untuk upload langsung dari klien",
      "Route handler Next.js untuk pembuatan signature autentikasi",
      "Komponen penampil gambar responsif berbasis Cloudinary CldImage",
    ],
    securityNote:
      "API Secret Cloudinary dijaga ketat di variabel server tanpa awalan NEXT_PUBLIC_.",
  },
  "4": {
    id: "4",
    title: "Orkestrasi Deployment Edge Serverless di Vercel",
    category: "Edge Computing",
    status: "Berjalan",
    xp: 300,
    dueDate: "Minggu 04",
    architecturePillar: "Vercel Platform",
    summary:
      "Distribusi komputasi ke jaringan Edge Vercel untuk meminimalkan latensi dan memaksimalkan performa Web Vitals.",
    keyDeliverables: [
      "Konfigurasi Edge Runtime pada rute kritis",
      "Penerapan automated preview deployments per pull request",
      "Pengaturan environment variables produksi di dashboard Vercel",
    ],
    securityNote:
      "Sinkronisasi secrets produksi diatur langsung via Vercel Project Settings tanpa hardcoding.",
  },
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // PENTING: Di Next.js 16, params adalah Promise asinkron
  const { id } = await params;

  const task = TASKS_REPOSITORY[id];

  if (!task) {
    notFound();
  }

  const isCompleted = task.status === "Selesai";

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/tasks"
          className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Daftar Tugas</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">Tugas #{id}</span>
      </nav>

      {/* Main Detail Card */}
      <Card className="border border-border/80 bg-card/70 backdrop-blur-sm overflow-hidden shadow-sm">
        <CardHeader className="p-6 md:p-8 border-b border-border/60 bg-muted/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold">
                Modul #{id}
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                {task.category}
              </Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 text-[11px]">
                {task.architecturePillar}
              </Badge>
            </div>

            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className={`text-xs font-semibold px-3 py-1 flex items-center gap-1.5 ${
                isCompleted
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
              <span>Status: {task.status}</span>
            </Badge>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-black tracking-tight">
              {task.title}
            </CardTitle>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {task.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Target: {task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <Sparkles className="h-4 w-4" />
              <span>+{task.xp} XP Capaian</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Key Deliverables */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Deliverables & Implementasi Teknis</span>
            </h4>
            <div className="grid gap-2.5">
              {task.keyDeliverables.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background/50 text-xs md:text-sm"
                >
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-foreground leading-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DevSecOps Note */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-foreground">Catatan Keamanan & DevSecOps</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {task.securityNote}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
            <Link href="/tasks">
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Ringkasan</span>
              </Button>
            </Link>

            <Button size="sm" className="gap-2 text-xs font-semibold shadow-xs">
              <span>Periksa Log Verifikasi</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
