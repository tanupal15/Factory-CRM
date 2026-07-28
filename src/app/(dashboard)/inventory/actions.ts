"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addInventoryItem(formData: FormData) {
  const supabase = createClient();
  
  const item = {
    sku: formData.get("sku") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    quantity: parseInt(formData.get("quantity") as string, 10),
    unit_price: parseFloat(formData.get("unit_price") as string),
    category: formData.get("category") as string,
  };

  const { error } = await supabase.from("inventory").insert([item]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/inventory");
}

export async function deleteInventoryItem(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("inventory").delete().eq("id", id);
  
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/inventory");
}
