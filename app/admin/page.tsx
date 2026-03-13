import { getShows, getBands, getGear } from "@/lib/data";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const shows = getShows();
  const bands = getBands();
  const gear = getGear();

  return <AdminDashboard shows={shows} bands={bands} gear={gear} />;
}
