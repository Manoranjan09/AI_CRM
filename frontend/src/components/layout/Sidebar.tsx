import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardPen,
  Settings,
  Globe,
  Briefcase,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "HCP Directory",
    path: "/hcp",
    icon: Users,
  },
  {
    title: "Log Interaction",
    path: "/",
    icon: ClipboardPen,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">

      {/* Logo */}

      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-blue-600">
          MediCRM AI
        </h1>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Developer Card */}

      <div className="border-t bg-slate-50 p-5">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Built By
        </p>

        <h3 className="mt-2 font-semibold text-slate-900">
          Manoranjan Kumar
        </h3>

        <p className="text-xs text-slate-500">
          AI & Full Stack Developer
        </p>

        {/* Portfolio */}

        <a
          href="https://manosportfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <Globe size={16} />
          View Portfolio
        </a>

        {/* Other Project */}

        <a
          href="https://clean-frontend-ssc-prep.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <Briefcase size={16} />
          More AI Projects
        </a>

      </div>

    </aside>
  );
}