import { useEffect, useState } from "react";
import { createInteraction } from "../../services/interactionService";
import { getHCPs } from "../../services/hcpService";
import AddDoctorDialog from "../hcp/AddDoctorDialog";


interface HCP {
  id: number;
  doctor_name: string;
  hospital: string | null;
  speciality: string | null;
}

export default function StructuredForm() {
  const [form, setForm] = useState({
    hcp_name: "",
    hospital: "",
    speciality: "",
    interaction_type: "Clinic Visit",
    products: "",
    notes: "",
    summary: "",
    follow_up_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [doctors, setDoctors] = useState<HCP[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
const [showAddDoctor, setShowAddDoctor] = useState(false);


  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await getHCPs();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctor_name
      .toLowerCase()
      .includes(form.hcp_name.toLowerCase())
  );

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    if (!form.hcp_name.trim()) {
      setMessage("HCP Name is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createInteraction({
        ...form,
        follow_up_date:
          form.follow_up_date === ""
            ? null
            : form.follow_up_date,
      });

      setMessage("✅ Interaction saved successfully.");

      setForm({
        hcp_name: "",
        hospital: "",
        speciality: "",
        interaction_type: "Clinic Visit",
        products: "",
        notes: "",
        summary: "",
        follow_up_date: "",
      });

      setShowSuggestions(false);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save interaction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold">
        Structured Interaction Form
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Record a healthcare professional interaction manually.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="relative">
          <label className="mb-2 block text-sm font-medium">
            HCP Name *
          </label>

          <input
            name="hcp_name"
            value={form.hcp_name}
            onChange={(e) => {
              update(e);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() =>
    setTimeout(() => {
        setShowSuggestions(false);
    }, 150)
}
            className="w-full rounded-lg border p-3"
            placeholder="Dr. Raj Sharma"
          />

          {showSuggestions && form.hcp_name && (
            <div className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => {
                      setForm({
                        ...form,
                        hcp_name: doctor.doctor_name,
                        hospital: doctor.hospital || "",
                        speciality: doctor.speciality || "",
                      });

                      setShowSuggestions(false);
                    }}
                    className="block w-full border-b px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p className="font-medium">
                      {doctor.doctor_name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {doctor.hospital || "-"} •{" "}
                      {doctor.speciality || "-"}
                    </p>
                  </button>
                ))
              ) : (
<div className="space-y-3 px-4 py-3">

  <p className="text-sm text-gray-500">
    No matching HCP found.
  </p>

  <button
    type="button"
    onClick={() => setShowAddDoctor(true)}
    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
  >
    + Add "{form.hcp_name}" to HCP Directory
  </button>

</div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Hospital
          </label>

          <input
            name="hospital"
            value={form.hospital}
            onChange={update}
            className="w-full rounded-lg border p-3"
            placeholder="Apollo Hospital"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Speciality
          </label>

          <input
            name="speciality"
            value={form.speciality}
            onChange={update}
            className="w-full rounded-lg border p-3"
            placeholder="Cardiology"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Interaction Type
          </label>

          <select
            name="interaction_type"
            value={form.interaction_type}
            onChange={update}
            className="w-full rounded-lg border p-3"
          >
            <option>Clinic Visit</option>
            <option>Hospital Visit</option>
            <option>Conference</option>
            <option>Phone Call</option>
            <option>Virtual Meeting</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Products Discussed
          </label>

          <input
            name="products"
            value={form.products}
            onChange={update}
            className="w-full rounded-lg border p-3"
            placeholder="CardioX"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Summary
          </label>

          <textarea
            rows={3}
            name="summary"
            value={form.summary}
            onChange={update}
            className="w-full rounded-lg border p-3"
            placeholder="Short summary of the interaction..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>

          <textarea
            rows={4}
            name="notes"
            value={form.notes}
            onChange={update}
            className="w-full rounded-lg border p-3"
            placeholder="Additional notes..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Follow-up Date
          </label>

          <input
            type="date"
            name="follow_up_date"
            value={form.follow_up_date}
            onChange={update}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm">
          {message}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Interaction"}
        </button>
        
      </div>
      <AddDoctorDialog
  open={showAddDoctor}
  onClose={() => setShowAddDoctor(false)}
 onDoctorAdded={async () => {
  await loadDoctors();

  setShowAddDoctor(false);

  setShowSuggestions(true);
}}
  initialDoctorName={form.hcp_name}
  initialHospital={form.hospital}
  initialSpeciality={form.speciality}
/>

    </div>
  );
}