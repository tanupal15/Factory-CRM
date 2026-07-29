"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
  const supabase = createClient();
  const project = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    status: (formData.get("status") as string) || "PLANNING",
    start_date: formData.get("start_date") as string || null,
    end_date: formData.get("end_date") as string || null,
  };

  const { error } = await supabase.from("projects").insert([project]);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}

export async function updateProjectStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("projects").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
}
