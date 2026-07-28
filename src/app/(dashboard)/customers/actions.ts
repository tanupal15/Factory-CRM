"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCustomer(formData: FormData) {
  const supabase = createClient();
  
  const customer = {
    company_name: formData.get("company_name") as string,
    contact_name: formData.get("contact_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
  };

  const { error } = await supabase.from("customers").insert([customer]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/customers");
}

export async function deleteCustomer(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("customers").delete().eq("id", id);
  
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/customers");
}
