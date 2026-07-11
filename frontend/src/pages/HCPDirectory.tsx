import DoctorTable from "../components/hcp/DoctorTable";
import AddDoctorDialog from "../components/hcp/AddDoctorDialog";

export default function HCPDirectory() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            HCP Directory
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Healthcare Professionals
          </p>
        </div>

        <AddDoctorDialog />
      </div>

      <DoctorTable />

    </div>
  );
}