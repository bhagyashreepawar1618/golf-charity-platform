import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("adminaccessToken");

      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/get-all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Response=", res.data.data);

        // IMPORTANT (store in state)
        setUsers(res.data.data.totalUsers);
      } catch (e) {
        console.log("error while getting user count", e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A002B] text-white px-4 py-8 md:px-10">
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-[#7B2CBF] opacity-20 blur-3xl rounded-full top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-[#C8A2FF] opacity-10 blur-3xl rounded-full bottom-20 right-20"></div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#C8A2FF]">
          Dashboard Overview
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card */}
          <div className="bg-[#2A0A3D] p-6 rounded-2xl border border-[#7B2CBF]/30 shadow-lg hover:scale-[1.04] transition">
            <h2 className="text-sm text-[#C8A2FF]/70">Users</h2>
            <p className="text-3xl font-bold mt-3">{users}</p>
          </div>

          <div className="bg-[#2A0A3D] p-6 rounded-2xl border border-[#7B2CBF]/30 shadow-lg hover:scale-[1.04] transition">
            <h2 className="text-sm text-[#C8A2FF]/70">Prize Pool</h2>
            <p className="text-3xl font-bold mt-3">₹50,000</p>
          </div>

          <div className="bg-[#2A0A3D] p-6 rounded-2xl border border-[#7B2CBF]/30 shadow-lg hover:scale-[1.04] transition">
            <h2 className="text-sm text-[#C8A2FF]/70">Charity</h2>
            <p className="text-3xl font-bold mt-3">₹20,000</p>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-[#2A0A3D] p-6 rounded-2xl border border-[#7B2CBF]/30 shadow-lg">
            <h2 className="text-lg font-semibold text-[#C8A2FF] mb-4">
              Recent Activity
            </h2>

            <ul className="space-y-3 text-sm text-[#C8A2FF]/70">
              <li>• New user registered</li>
              <li>• Monthly draw created</li>
              <li>• Prize updated</li>
              <li>• Charity funds transferred</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#2A0A3D] p-6 rounded-2xl border border-[#7B2CBF]/30 shadow-lg">
            <h2 className="text-lg font-semibold text-[#C8A2FF] mb-4">
              Quick Actions
            </h2>

            <div className="flex flex-wrap gap-4">
              <button
                className="px-4 py-2 bg-[#C8A2FF] text-black rounded-lg hover:bg-[#7B2CBF] hover:text-white transition"
                onClick={() => {
                  navigate("/run-draw");
                }}
              >
                Add Draw
              </button>

              <button
                className="px-4 py-2 border border-[#C8A2FF]/40 rounded-lg hover:bg-[#7B2CBF]/30 transition"
                onClick={() => {
                  navigate("/get-users-list");
                }}
              >
                View Users
              </button>

              <button
                onClick={() => navigate("/set-charity")}
                className="px-4 py-2 border border-[#C8A2FF]/40 rounded-lg hover:bg-[#7B2CBF]/30 transition"
              >
                Manage Charity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
