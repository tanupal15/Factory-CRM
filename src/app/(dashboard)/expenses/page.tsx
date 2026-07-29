import { createClient } from "@/utils/supabase/server";
import ExpenseClient from "./ExpenseClient";

export const revalidate = 0;

export default async function ExpensesPage() {
  const supabase = createClient();
  const { data: expenses } = await supabase.from("expenses").select("*").order("expense_date", { ascending: false });

  const initialData = (expenses && expenses.length > 0) ? expenses : [
    { id: 'ex1', title: 'Industrial Power Grid Utility - Sector G', category: 'UTILITIES', amount: 14250.00, expense_date: '2026-07-01', description: 'High voltage grid operational consumption' },
    { id: 'ex2', title: 'Carbide Lathe Inserts Procurement', category: 'RAW_MATERIALS', amount: 3800.50, expense_date: '2026-07-10', description: 'Stock replacement for CNC G7' },
    { id: 'ex3', title: 'Hydraulic Seals & Fluid Replacement', category: 'MAINTENANCE', amount: 1290.00, expense_date: '2026-07-18', description: 'Preventative press overhaul' }
  ];

  return <ExpenseClient initialData={initialData} />;
}
