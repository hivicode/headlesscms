"use server";

import { revalidatePath } from "next/cache";
import { TaskSchema, type ActionState, type TaskInput } from "@/lib/schemas";

export async function createTaskAction(
  _prevState: ActionState<TaskInput> | null,
  formData: FormData
): Promise<ActionState<TaskInput>> {
  // Simulasi latensi jaringan edge serverless (300ms) untuk mengamati isPending state
  await new Promise((resolve) => setTimeout(resolve, 300));

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    priority: formData.get("priority"),
  };

  const validationResult = TaskSchema.safeParse(rawData);

  if (!validationResult.success) {
    const flattenedErrors = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validasi gagal. Silakan periksa kembali isian formulir tugas Anda.",
      fieldErrors: flattenedErrors,
    };
  }

  const validTask = validationResult.data;

  // Di sini nantinya terhubung dengan PostgreSQL Supabase Client (Server-side)
  // Revalidasi cache rute /tasks di Next.js App Router
  revalidatePath("/tasks");

  return {
    success: true,
    message: `Tugas "${validTask.title}" berhasil dibuat dan dicatat ke sistem serverless.`,
    data: validTask,
  };
}
