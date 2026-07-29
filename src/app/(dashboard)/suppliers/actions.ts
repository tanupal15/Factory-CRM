"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSupplier(formData: FormData) {
  const supabase = createClient();
  const supplier = {
    name: formData.get("name") as string,
    contact_name: formData.get("contact_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  const { error } = await supabase.from("suppliers").insert([supplier]);
  if (error) throw new Error(error.message);
  revalidatePath("/suppliers");
}

export async function deleteSupplier(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("suppliers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/suppliers");
}
