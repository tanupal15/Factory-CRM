"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  const supabase = createClient();
  const expense = {
    title: formData.get("title") as string,
    category: (formData.get("category") as string) || "OPERATIONAL",
    amount: parseFloat(formData.get("amount") as string) || 0,
    expense_date: formData.get("expense_date") as string || new Date().toISOString().split('T')[0],
    description: formData.get("description") as string,
  };

  const { error } = await supabase.from("expenses").insert([expense]);
  if (error) throw new Error(error.message);
  revalidatePath("/expenses");
}

export async function deleteExpense(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/expenses");
}
