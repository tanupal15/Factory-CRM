"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addMachine(formData: FormData) {
  const supabase = createClient();
  const machine = {
    name: formData.get("name") as string,
    machine_code: formData.get("machine_code") as string,
    sector: formData.get("sector") as string,
    status: (formData.get("status") as string) || "ACTIVE",
  };

  const { error } = await supabase.from("machines").insert([machine]);
  if (error) throw new Error(error.message);
  revalidatePath("/machines");
  revalidatePath("/dashboard");
}

export async function deleteMachine(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("machines").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/machines");
  revalidatePath("/dashboard");
}

export async function updateMachineStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("machines").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/machines");
  revalidatePath("/dashboard");
}
