import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            className={iconColor}
            size={28}
          />
        </div>

      </div>

    </div>
  );
}