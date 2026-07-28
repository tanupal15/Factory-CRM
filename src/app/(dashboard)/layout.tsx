import TopNav from "@/components/layout/TopNav";
import SideNav from "@/components/layout/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <SideNav />
      <main className="md:ml-64 p-margin pt-24 min-h-screen">
        {children}
      </main>
    </>
  );
}
