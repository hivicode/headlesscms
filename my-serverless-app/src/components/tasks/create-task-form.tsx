"use client";

import { useActionState, useRef, useEffect } from "react";
import { createTaskAction } from "@/actions/tasks";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from "lucide-react";

export function CreateTaskForm() {
  const [state, formAction, isPending] = useActionState(createTaskAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state?.success]);

  return (
    <Card className="border border-border/80 bg-card/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
      {/* Decorative accent highlight */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

      <CardHeader className="space-y-1.5 p-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">Tambah Tugas Serverless</CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Mutasi data via Next.js 16 Server Action & React 19 useActionState tanpa API Route manual.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-2 space-y-4">
        {/* Feedback Alert */}
        {state && (
          <Alert
            variant={state.success ? "default" : "destructive"}
            className={
              state.success
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                : "border-destructive/30 bg-destructive/10"
            }
          >
            {state.success ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            <AlertTitle className="text-xs font-semibold">
              {state.success ? "Berhasil Disimpan" : "Gagal Memvalidasi"}
            </AlertTitle>
            <AlertDescription className="text-xs leading-relaxed">
              {state.message}
            </AlertDescription>
          </Alert>
        )}

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Field: Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold">
              Judul Tugas <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Contoh: Rancang Migrasi Skema Supabase"
              disabled={isPending}
              className={`text-xs ${
                state?.fieldErrors?.title
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : ""
              }`}
            />
            {state?.fieldErrors?.title && (
              <p className="text-[11px] font-medium text-destructive">
                {state.fieldErrors.title[0]}
              </p>
            )}
          </div>

          {/* Field: Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold">
              Deskripsi Singkat (Opsional)
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Tuliskan catatan teknis atau deliverable tugas..."
              disabled={isPending}
              className={`text-xs resize-none ${
                state?.fieldErrors?.description
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : ""
              }`}
            />
            {state?.fieldErrors?.description && (
              <p className="text-[11px] font-medium text-destructive">
                {state.fieldErrors.description[0]}
              </p>
            )}
          </div>

          {/* Field: Priority */}
          <div className="space-y-1.5">
            <Label htmlFor="priority" className="text-xs font-semibold">
              Tingkat Prioritas <span className="text-destructive">*</span>
            </Label>
            <select
              id="priority"
              name="priority"
              defaultValue="medium"
              disabled={isPending}
              aria-label="Tingkat Prioritas"
              className={`w-full rounded-md border bg-background px-3 py-2 text-xs font-medium shadow-xs focus:outline-none focus:ring-1 focus:ring-ring ${
                state?.fieldErrors?.priority
                  ? "border-destructive"
                  : "border-input"
              }`}
            >
              <option value="low">Rendah (Low - +100 XP)</option>
              <option value="medium">Menengah (Medium - +200 XP)</option>
              <option value="high">Tinggi (High - +300 XP)</option>
            </select>
            {state?.fieldErrors?.priority && (
              <p className="text-[11px] font-medium text-destructive">
                {state.fieldErrors.priority[0]}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-xs font-semibold gap-2 py-5 shadow-sm cursor-pointer transition-all hover:shadow-md"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Memproses Server Action...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Simpan Tugas ke Cloud</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
