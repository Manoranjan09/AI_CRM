import { Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { checkBackendStatus } from "../../services/backendStatusService";

type Status = "checking" | "online" | "offline";

export default function AIStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    checkStatus();

    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  async function checkStatus() {
    try {
      await checkBackendStatus();
      setStatus("online");
    } catch (err) {
      console.error(err);
      setStatus("offline");
    }
  }

  const config = {
    checking: {
      color: "bg-yellow-500",
      text: "Waking up...",
      textColor: "text-yellow-600",
    },
    online: {
      color: "bg-green-500",
      text: "AI Connected",
      textColor: "text-green-600",
    },
    offline: {
      color: "bg-red-500",
      text: "AI Offline",
      textColor: "text-red-600",
    },
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2 shadow-sm">

      <div className="relative">
        <Bot className="text-blue-600" size={20} />

        <span
          className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${config[status].color} ${
            status === "checking" ? "animate-pulse" : ""
          }`}
        />
      </div>

      <div>
        <p className="text-xs text-gray-500">
          AI Assistant
        </p>

        <p
          className={`text-sm font-semibold ${config[status].textColor}`}
        >
          {config[status].text}
        </p>
      </div>

    </div>
  );
}