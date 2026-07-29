"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addQuotation(formData: FormData) {
  const supabase = createClient();
  const quotation = {
    quotation_number: (formData.get("quotation_number") as string) || `QT-${Math.floor(Math.random() * 90000 + 10000)}`,
    customer_id: formData.get("customer_id") as string || null,
    total_amount: parseFloat(formData.get("total_amount") as string) || 0,
    status: (formData.get("status") as string) || "DRAFT",
    valid_until: formData.get("valid_until") as string || null,
    notes: formData.get("notes") as string,
  };

  const { error } = await supabase.from("quotations").insert([quotation]);
  if (error) throw new Error(error.message);
  revalidatePath("/quotations");
}

export async function deleteQuotation(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/quotations");
}

export async function updateQuotationStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("quotations").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/quotations");
}
