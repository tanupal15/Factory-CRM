"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
  const supabase = createClient();
  const task = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    assigned_to: formData.get("assigned_to") as string || null,
    status: (formData.get("status") as string) || "TODO",
    priority: (formData.get("priority") as string) || "MEDIUM",
    due_date: formData.get("due_date") as string || null,
  };

  const { error } = await supabase.from("tasks").insert([task]);
  if (error) throw new Error(error.message);
  revalidatePath("/tasks");
}

export async function deleteTask(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/tasks");
}

export async function updateTaskStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("tasks").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/tasks");
}
