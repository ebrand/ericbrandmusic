import { getShows, getBands, getGearRows, getBlogPosts } from "@/lib/data";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [shows, bands, gearRows, blogPosts] = await Promise.all([
    getShows(),
    getBands(),
    getGearRows(),
    getBlogPosts(),
  ]);

  return <AdminDashboard shows={shows} bands={bands} gearRows={gearRows} blogPosts={blogPosts} />;
}
