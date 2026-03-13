import StytchProvider from "@/components/admin/StytchProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StytchProvider>{children}</StytchProvider>;
}
