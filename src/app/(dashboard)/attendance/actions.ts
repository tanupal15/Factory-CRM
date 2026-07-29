"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addAttendance(formData: FormData) {
  const supabase = createClient();
  const att = {
    worker_id: formData.get("worker_id") as string,
    work_date: formData.get("work_date") as string || new Date().toISOString().split('T')[0],
    status: (formData.get("status") as string) || "PRESENT",
    check_in: formData.get("check_in") as string || "08:00 AM",
    check_out: formData.get("check_out") as string || "05:00 PM",
    notes: formData.get("notes") as string,
  };

  const { error } = await supabase.from("attendance").insert([att]);
  if (error) throw new Error(error.message);
  revalidatePath("/attendance");
}

export async function deleteAttendance(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("attendance").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/attendance");
}
