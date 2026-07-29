import { createClient } from "@/utils/supabase/server";
import ProductClient from "./ProductClient";

export const revalidate = 0;

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  const initialData = (products && products.length > 0) ? products : [
    { id: 'pr1', sku: 'PROD-1001', name: 'Industrial Servo Motor 500W', category: 'Automation', unit_price: 450.00, stock_quantity: 42, description: 'High torque brushless motor' },
    { id: 'pr2', sku: 'PROD-1002', name: 'Hydraulic Cylinder 100mm', category: 'Hydraulics', unit_price: 680.50, stock_quantity: 15, description: 'Double acting heavy duty cylinder' },
    { id: 'pr3', sku: 'PROD-1003', name: 'Precision Alloy Gearbox', category: 'Transmission', unit_price: 1200.00, stock_quantity: 8, description: '1:50 reduction planetary gear' },
    { id: 'pr4', sku: 'PROD-1004', name: 'PLC Controller Board V4', category: 'Electronics', unit_price: 890.00, stock_quantity: 25, description: 'Multi-input programmable logic controller' }
  ];

  return <ProductClient initialData={initialData} />;
}
