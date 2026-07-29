"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addReport(formData: FormData) {
  const supabase = createClient();
  const report = {
    title: formData.get("title") as string,
    report_type: formData.get("report_type") as string,
    summary: formData.get("summary") as string,
    status: "COMPLETED",
  };

  const { error } = await supabase.from("reports").insert([report]);
  if (error) throw new Error(error.message);
  revalidatePath("/reports");
}

export async function deleteReport(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("reports").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/reports");
}
