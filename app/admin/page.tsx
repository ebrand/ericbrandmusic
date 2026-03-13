import { getShows, getBands, getGearRows } from "@/lib/data";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [shows, bands, gearRows] = await Promise.all([
    getShows(),
    getBands(),
    getGearRows(),
  ]);

  return <AdminDashboard shows={shows} bands={bands} gearRows={gearRows} />;
}
