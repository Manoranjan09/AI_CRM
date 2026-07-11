import { useEffect, useState } from "react";
import { createHCP } from "../../services/hcpService";

interface AddDoctorDialogProps {
  open?: boolean;
  onClose?: () => void;
  onDoctorAdded?: () => void;
  initialDoctorName?: string;
  initialHospital?: string;
  initialSpeciality?: string;
}

export default function AddDoctorDialog({
  open: controlledOpen,
  onClose,
  onDoctorAdded,
  initialDoctorName = "",
  initialHospital = "",
  initialSpeciality = "",
}: AddDoctorDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open =
    controlledOpen !== undefined
      ? controlledOpen
      : internalOpen;

  const closeDialog = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const [form, setForm] = useState({
    doctor_name: "",
    speciality: "",
    hospital: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        doctor_name: initialDoctorName,
        speciality: initialSpeciality,
        hospital: initialHospital,
        city: "",
        phone: "",
        email: "",
      });
    }
  }, [
    open,
    initialDoctorName,
    initialHospital,
    initialSpeciality,
  ]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createHCP(form);

      alert("Doctor added successfully.");

      closeDialog();

      if (onDoctorAdded) {
        onDoctorAdded();
      }

      setForm({
        doctor_name: "",
        speciality: "",
        hospital: "",
        city: "",
        phone: "",
        email: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to add doctor.");
    }
  }

  return (
    <>
      {controlledOpen === undefined && (
        <button
          onClick={() => setInternalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          + Add Doctor
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <form
            onSubmit={handleSubmit}
            className="w-[500px] space-y-4 rounded-xl bg-white p-6"
          >
            <h2 className="text-xl font-semibold">
              Add Healthcare Professional
            </h2>

            <input
              placeholder="Doctor Name"
              className="w-full rounded-lg border p-3"
              value={form.doctor_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  doctor_name: e.target.value,
                })
              }
            />

            <input
              placeholder="Speciality"
              className="w-full rounded-lg border p-3"
              value={form.speciality}
              onChange={(e) =>
                setForm({
                  ...form,
                  speciality: e.target.value,
                })
              }
            />

            <input
              placeholder="Hospital"
              className="w-full rounded-lg border p-3"
              value={form.hospital}
              onChange={(e) =>
                setForm({
                  ...form,
                  hospital: e.target.value,
                })
              }
            />

            <input
              placeholder="City"
              className="w-full rounded-lg border p-3"
              value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone"
              className="w-full rounded-lg border p-3"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              className="w-full rounded-lg border p-3"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={closeDialog}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Save
              </button>

            </div>

          </form>

        </div>
      )}
    </>
  );
}