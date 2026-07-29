"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  const supabase = createClient();
  const product = {
    sku: (formData.get("sku") as string) || `PROD-${Math.floor(Math.random() * 9000 + 1000)}`,
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    unit_price: parseFloat(formData.get("unit_price") as string) || 0,
    stock_quantity: parseInt(formData.get("stock_quantity") as string, 10) || 0,
    description: formData.get("description") as string,
  };

  const { error } = await supabase.from("products").insert([product]);
  if (error) throw new Error(error.message);
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/products");
}
