import {  Search, User, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { globalSearch } from "../../services/searchService";

import AIStatus from "./AIStatus";

interface Doctor {
  id: number;
  doctor_name: string;
  hospital: string;
}

interface Interaction {
  id: number;
  hcp_name: string;
  summary: string;
}

export default function Navbar() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState({
    doctors: [] as Doctor[],
    interactions: [] as Interaction[],
  });

  useEffect(() => {
    async function search() {
      if (query.trim().length < 2) {
        setResults({
          doctors: [],
          interactions: [],
        });
        return;
      }

      try {
        const data = await globalSearch(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }

    const timeout = setTimeout(search, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <header className="relative flex h-16 items-center justify-between border-b bg-white px-6">

      <div className="relative w-96">

        <div className="flex items-center gap-3 rounded-lg border px-3 py-2">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search doctors, hospitals, products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
          />

        </div>

        {query.length >= 2 &&
          (results.doctors.length > 0 ||
            results.interactions.length > 0) && (

            <div className="absolute left-0 right-0 top-14 z-50 rounded-xl border bg-white shadow-xl">

              {results.doctors.length > 0 && (
                <>
                  <div className="border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase text-gray-500">
                    Doctors
                  </div>

                  {results.doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex cursor-pointer items-center gap-3 border-b px-4 py-3 hover:bg-slate-50"
                    >
                      <User
                        size={18}
                        className="text-blue-600"
                      />

                      <div>
                        <p className="font-medium">
                          {doctor.doctor_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {doctor.hospital}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {results.interactions.length > 0 && (
                <>
                  <div className="border-b bg-slate-50 px-4 py-2 text-xs font-semibold uppercase text-gray-500">
                    Interactions
                  </div>

                  {results.interactions.map((interaction) => (
                    <div
                      key={interaction.id}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-slate-50"
                    >
                      <FileText
                        size={18}
                        className="text-green-600"
                      />

                      <div>
                        <p className="font-medium">
                          {interaction.hcp_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {interaction.summary || "No summary"}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>
          )}

      </div>

    <AIStatus />

    </header>
  );
}