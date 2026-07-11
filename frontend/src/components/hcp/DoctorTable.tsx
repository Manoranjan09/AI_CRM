import { useEffect, useState } from "react";
import {
  getHCPs,
  deleteHCP,
  updateHCP,
} from "../../services/hcpService";

interface HCP {
  id: number;
  doctor_name: string;
  speciality: string | null;
  hospital: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
}

export default function DoctorTable() {
  const [doctors, setDoctors] = useState<HCP[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const [editingDoctor, setEditingDoctor] = useState<HCP | null>(null);

const [editForm, setEditForm] = useState({
  doctor_name: "",
  speciality: "",
  hospital: "",
  city: "",
  phone: "",
  email: "",
});
  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await getHCPs();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) return;

    try {
      await deleteHCP(id);
      await loadDoctors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete doctor.");
    }
  }
  async function handleUpdate(e: React.FormEvent) {
  e.preventDefault();

  if (!editingDoctor) return;

  try {
    await updateHCP(editingDoctor.id, editForm);

    await loadDoctors();

    setEditingDoctor(null);

    alert("Doctor updated successfully.");
  } catch (err) {
    console.error(err);
    alert("Failed to update doctor.");
  }
}
const searchText = search.toLowerCase().trim();

const filteredDoctors = doctors.filter((doctor) => {
  return (
    doctor.doctor_name.toLowerCase().includes(searchText) ||
    (doctor.hospital ?? "").toLowerCase().includes(searchText) ||
    (doctor.phone ?? "").toLowerCase().includes(searchText)
  );
});

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Search Bar */}
      <div className="border-b p-4">
        <input
          type="text"
          placeholder="Search by doctor, hospital or mobile number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">Doctor</th>
            <th className="p-4 text-left">Speciality</th>
            <th className="p-4 text-left">Hospital</th>
            <th className="p-4 text-left">City</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {doctor.doctor_name}
                </td>

                <td className="p-4">
                  {doctor.speciality || "-"}
                </td>

                <td className="p-4">
                  {doctor.hospital || "-"}
                </td>

                <td className="p-4">
                  {doctor.city || "-"}
                </td>

                <td className="p-4 text-center">

                 <button
  onClick={() => {
    setEditingDoctor(doctor);

    setEditForm({
      doctor_name: doctor.doctor_name,
      speciality: doctor.speciality ?? "",
      hospital: doctor.hospital ?? "",
      city: doctor.city ?? "",
      phone: doctor.phone ?? "",
      email: doctor.email ?? "",
    });
  }}
  className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
>
  Edit
</button>

                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="ml-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                No doctors found.
              </td>
            </tr>
          )}

        </tbody>

            </table>

      {editingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <form
            onSubmit={handleUpdate}
            className="w-[500px] rounded-xl bg-white p-6 shadow-xl space-y-4"
          >

            <h2 className="text-xl font-semibold">
              Edit Doctor
            </h2>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Doctor Name"
              value={editForm.doctor_name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  doctor_name: e.target.value,
                })
              }
            />

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Speciality"
              value={editForm.speciality}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  speciality: e.target.value,
                })
              }
            />

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Hospital"
              value={editForm.hospital}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  hospital: e.target.value,
                })
              }
            />

            <input
              className="w-full rounded-lg border p-3"
              placeholder="City"
              value={editForm.city}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  city: e.target.value,
                })
              }
            />

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Phone"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setEditingDoctor(null)}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}