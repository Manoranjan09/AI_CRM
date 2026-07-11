import {
  User,
  Lock,
  Bell,
  Bot,
  Info,
  Rocket,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Application configuration and future enhancements.
        </p>
      </div>

      {/* Roadmap */}

      <div className="rounded-2xl border bg-blue-50 p-6">

        <div className="flex items-center gap-3">

          <Rocket className="text-blue-600" />

          <h2 className="text-xl font-semibold">
            Future Roadmap
          </h2>

        </div>

        <p className="mt-4 text-gray-700 leading-7">
          Authentication, user profiles, role-based access,
          notifications and personalization are planned for
          future versions.

          <br /><br />

          This assignment focuses on AI-powered Healthcare
          CRM workflows using FastAPI, LangGraph and Neon.
        </p>

      </div>

      {/* User */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <User />

          <h2 className="text-xl font-semibold">
            User Profile
          </h2>

        </div>

        <div className="space-y-3">

          <SettingRow
            title="Name"
            value="Medical Representative"
          />

          <SettingRow
            title="Role"
            value="Medical Representative"
          />

          <SettingRow
            title="Status"
            value="Available after Authentication"
          />

        </div>

      </div>

      {/* Authentication */}

      <SettingsCard
        icon={<Lock size={20} />}
        title="Authentication"
        items={[
          "Google Login",
          "Email Login",
          "JWT Authentication",
        ]}
      />

      {/* AI */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Bot />

          <h2 className="text-xl font-semibold">
            AI Configuration
          </h2>

        </div>

        <div className="space-y-3">

          <SettingRow
            title="Framework"
            value="LangGraph"
          />

          <SettingRow
            title="LLM"
            value="Groq"
          />

          <SettingRow
            title="Model"
            value="Llama 3.3 70B"
          />

        </div>

      </div>

      {/* Notifications */}

      <SettingsCard
        icon={<Bell size={20} />}
        title="Notifications"
        items={[
          "Email Notifications",
          "Follow-up Reminders",
        ]}
      />

      {/* About */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <Info />

          <h2 className="text-xl font-semibold">
            Application Information
          </h2>

        </div>

        <div className="space-y-3">

          <SettingRow
            title="Version"
            value="1.0.0"
          />

          <SettingRow
            title="Frontend"
            value="React + Vite"
          />

          <SettingRow
            title="Backend"
            value="FastAPI"
          />

          <SettingRow
            title="Database"
            value="Neon PostgreSQL"
          />

          <SettingRow
            title="Status"
            value="Assignment Version"
          />

        </div>

      </div>

    </div>
  );
}

function SettingRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-gray-500">
        {title}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}

function SettingsCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        {icon}

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

      </div>

      <div className="space-y-4">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between border-b pb-3"
          >
            <span>{item}</span>

            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
              Coming Soon
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}