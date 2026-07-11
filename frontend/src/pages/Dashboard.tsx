import DashboardStats from "../components/dashboard/DashboardStats";
import RecentInteractions from "../components/dashboard/RecentInteractions";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
  Monitor healthcare professionals, interactions, follow-ups, and AI activity in one place.
</p>

      </div>

      <DashboardStats />

      <RecentInteractions />

    </div>
  );
}