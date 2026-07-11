import { useEffect, useState } from "react";
import {
  Calendar,
  Activity,
  Users,
  CalendarClock,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

interface DashboardStats {
  total_hcps: number;
  total_interactions: number;
  upcoming_followups: number;
  today_interactions: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

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
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Interactions",
      value: stats.today_interactions,
      icon: Calendar,
    },
    {
      title: "Total Interactions",
      value: stats.total_interactions,
      icon: Activity,
    },
    {
      title: "Total HCPs",
      value: stats.total_hcps,
      icon: Users,
    },
    {
      title: "Upcoming Follow-ups",
      value: stats.upcoming_followups,
      icon: CalendarClock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <Icon
                size={20}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}