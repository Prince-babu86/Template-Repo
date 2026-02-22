import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  // 🔹 Fake data (replace with API)
  useEffect(() => {
    setReports([
      {
        id: 1,
        name: "Prince",
        email: "prince@email.com",
        message: "Login is not working properly",
      },
      {
        id: 2,
        name: "Rahul",
        email: "rahul@email.com",
        message: "UI is slow on dashboard",
      },
    ]);
  }, []);

  return (
    <div className="bg-[#0b1220] p-6 rounded-xl border border-white/5">

      {/* Header */}
      <h2 className="text-lg font-semibold mb-6">User Reports</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-gray-400 border-b border-white/5">
            <tr>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Message</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-4 font-medium">{report.name}</td>
                <td className="py-4 text-gray-400">{report.email}</td>
                <td className="py-4 text-gray-300">
                  {report.message}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Reports;