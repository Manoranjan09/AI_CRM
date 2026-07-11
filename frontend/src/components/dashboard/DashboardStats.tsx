import { useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  CalendarClock,
  Activity,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";
import StatCard from "./StatCard";

interface Stats {
  total_hcps: number;
  total_interactions: number;
  upcoming_followups: number;
  today_interactions: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!stats) {
    return (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="h-32 animate-pulse rounded-2xl bg-slate-200"
      />
    ))}

  </div>
);
  }

 return (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    <StatCard
      title="Total HCPs"
      value={stats.total_hcps}
      icon={Users}
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
    />

    <StatCard
      title="Interactions"
      value={stats.total_interactions}
      icon={ClipboardList}
      iconBg="bg-green-100"
      iconColor="text-green-600"
    />

    <StatCard
      title="Upcoming Follow Ups"
      value={stats.upcoming_followups}
      icon={CalendarClock}
      iconBg="bg-orange-100"
      iconColor="text-orange-600"
    />

    <StatCard
      title="Today's Logs"
      value={stats.today_interactions}
      icon={Activity}
      iconBg="bg-purple-100"
      iconColor="text-purple-600"
    />

  </div>
);
}