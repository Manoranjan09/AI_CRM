const interactions = [
  {
    doctor: "Dr. Raj Sharma",
    hospital: "Apollo Hospital",
    product: "CardioX",
    date: "11 Jul 2026",
    status: "Completed",
  },
  {
    doctor: "Dr. Priya Singh",
    hospital: "Fortis",
    product: "NeuroPlus",
    date: "10 Jul 2026",
    status: "Follow-up",
  },
];

export default function InteractionTable() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Interactions
        </h2>
      </div>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b text-left">

            <th className="pb-3">Doctor</th>
            <th>Hospital</th>
            <th>Product</th>
            <th>Date</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {interactions.map((item) => (

            <tr
              key={item.doctor}
              className="border-b"
            >

              <td className="py-4">{item.doctor}</td>
              <td>{item.hospital}</td>
              <td>{item.product}</td>
              <td>{item.date}</td>

              <td>

                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

                  {item.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}