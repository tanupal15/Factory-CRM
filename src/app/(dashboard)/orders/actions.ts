"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addOrder(formData: FormData) {
  const supabase = createClient();
  
  const customerId = formData.get("customer_id") as string;
  
  if (!customerId) {
      throw new Error("Customer is required");
  }

  const order = {
    customer_id: customerId,
    status: formData.get("status") as string || 'PENDING',
    total_amount: parseFloat(formData.get("total_amount") as string),
  };

  const { error } = await supabase.from("orders").insert([order]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/orders");
}

export async function deleteOrder(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/orders");
}
