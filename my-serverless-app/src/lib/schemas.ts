import { z } from "zod";

export const TaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Judul tugas minimal 3 karakter.")
    .max(100, "Judul tugas maksimal 100 karakter."),
  description: z
    .string()
    .trim()
    .max(500, "Deskripsi maksimal 500 karakter.")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["low", "medium", "high"], {
    message: "Prioritas harus bernilai low, medium, atau high.",
  }),
});

export type TaskInput = z.infer<typeof TaskSchema>;

export interface ActionState<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  fieldErrors?: Partial<Record<keyof TaskInput, string[]>>;
}
