import { useEffect, useState } from "react";
import {
  Stethoscope,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getRecentInteractions } from "../../services/dashboardService";

interface Interaction {
  id: number;
  hcp_name: string;
  hospital: string;
  summary: string;
  created_at: string;
}

export default function RecentInteractions() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadInteractions();
  }, []);

  async function loadInteractions() {
    try {
      const data = await getRecentInteractions();
      setInteractions(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Interactions
          </h2>

          <p className="text-sm text-gray-500">
            Latest interactions logged using AI and manual forms.
          </p>

        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          <Plus size={16} />
          New Interaction
        </button>

      </div>

      {/* Interaction List */}

      <div className="space-y-4">

        {interactions.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 rounded-xl border p-4 transition hover:bg-slate-50"
          >

            <div className="rounded-full bg-blue-100 p-3">
              <Stethoscope
                className="text-blue-600"
                size={20}
              />
            </div>

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  {item.hcp_name}
                </h3>

                <span className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleString()}
                </span>

              </div>

              <p className="text-sm text-gray-500">
                {item.hospital}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {item.summary || "No summary available"}
              </p>

            </div>

          </div>
        ))}

        {/* Empty State */}

        {interactions.length === 0 && (

          <div className="rounded-xl border border-dashed p-10 text-center">

            <Stethoscope
              size={42}
              className="mx-auto mb-4 text-gray-400"
            />

            <h3 className="text-lg font-semibold">
              No interactions yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Start by logging your first healthcare professional interaction.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              Log First Interaction
            </button>

          </div>

        )}

      </div>

      {/* Footer */}

      {interactions.length > 0 && (

        <div className="mt-6 flex justify-end">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            View All Interactions

            <ArrowRight size={16} />

          </button>

        </div>

      )}

    </div>
  );
}