import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Zap, CheckSquare, BarChart3 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Sticky glassmorphism header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight leading-none">CloudTask Pro</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Odyssey v1.0</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/tasks"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-foreground hover:bg-muted/70 transition-colors"
              >
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>Tugas</span>
              </Link>
              <Link
                href="/tasks"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analitik</span>
              </Link>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="h-5 w-px bg-border hidden sm:block" />

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-1">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="DevSecOps Engineer" />
                <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">SO</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight">Bintang S.</span>
                <span className="text-[10px] text-muted-foreground leading-none">Cloud Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
