"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addPurchaseOrder(formData: FormData) {
  const supabase = createClient();
  const po = {
    po_number: (formData.get("po_number") as string) || `PO-${Math.floor(Math.random() * 90000 + 10000)}`,
    supplier_id: formData.get("supplier_id") as string || null,
    total_amount: parseFloat(formData.get("total_amount") as string) || 0,
    status: (formData.get("status") as string) || "DRAFT",
    expected_delivery: formData.get("expected_delivery") as string || null,
  };

  const { error } = await supabase.from("purchase_orders").insert([po]);
  if (error) throw new Error(error.message);
  revalidatePath("/purchase-orders");
}

export async function deletePurchaseOrder(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("purchase_orders").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/purchase-orders");
}

export async function updatePOStatus(id: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from("purchase_orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/purchase-orders");
}
