"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addDepartment(formData: FormData) {
  const supabase = createClient();
  const dept = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const { error } = await supabase.from("departments").insert([dept]);
  if (error) throw new Error(error.message);
  revalidatePath("/departments");
}

export async function deleteDepartment(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("departments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/departments");
}
