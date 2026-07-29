"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addInvoice(formData: FormData) {
  const supabase = createClient();
  const invoice = {
    invoice_number: (formData.get("invoice_number") as string) || `INV-${Math.floor(Math.random() * 90000 + 10000)}`,
    customer_id: formData.get("customer_id") as string || null,
    amount_due: parseFloat(formData.get("amount_due") as string) || 0,
    amount_paid: parseFloat(formData.get("amount_paid") as string) || 0,
    status: (formData.get("status") as string) || "UNPAID",
    due_date: formData.get("due_date") as string || null,
  };

  const { error } = await supabase.from("invoices").insert([invoice]);
  if (error) throw new Error(error.message);
  revalidatePath("/invoices");
}

export async function deleteInvoice(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/invoices");
}

export async function updateInvoiceStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("invoices").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/invoices");
}
