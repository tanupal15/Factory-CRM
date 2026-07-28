"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addWorker(formData: FormData) {
  const supabase = createClient();
  
  const worker = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    position: formData.get("position") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    status: formData.get("status") as string || 'ACTIVE',
  };

  const { error } = await supabase.from("workers").insert([worker]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/workers");
}

export async function deleteWorker(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("workers").delete().eq("id", id);
  
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/workers");
}
