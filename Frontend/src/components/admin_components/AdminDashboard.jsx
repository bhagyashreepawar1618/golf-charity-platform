import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#C8A2FF]">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Users */}
        <div className="bg-[#2A0A3D] p-5 rounded-xl border border-[#7B2CBF]/20 shadow-md hover:scale-[1.03] transition">
          <h2 className="text-sm text-[#C8A2FF]/70">Users</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-2">120</p>
        </div>

        {/* Subscriptions */}
        <div className="bg-[#2A0A3D] p-5 rounded-xl border border-[#7B2CBF]/20 shadow-md hover:scale-[1.03] transition">
          <h2 className="text-sm text-[#C8A2FF]/70">Subscriptions</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-2">80</p>
        </div>

        {/* Prize Pool */}
        <div className="bg-[#2A0A3D] p-5 rounded-xl border border-[#7B2CBF]/20 shadow-md hover:scale-[1.03] transition">
          <h2 className="text-sm text-[#C8A2FF]/70">Prize Pool</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-2">₹50,000</p>
        </div>

        {/* Charity */}
        <div className="bg-[#2A0A3D] p-5 rounded-xl border border-[#7B2CBF]/20 shadow-md hover:scale-[1.03] transition">
          <h2 className="text-sm text-[#C8A2FF]/70">Charity</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-2">₹20,000</p>
        </div>
      </div>

      {/* Extra Section (Pro Touch ) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#2A0A3D] p-6 rounded-xl border border-[#7B2CBF]/20">
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
        <div className="bg-[#2A0A3D] p-6 rounded-xl border border-[#7B2CBF]/20">
          <h2 className="text-lg font-semibold text-[#C8A2FF] mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#C8A2FF] text-black rounded-lg hover:bg-[#7B2CBF] hover:text-white transition">
              Add Draw
            </button>

            <button className="px-4 py-2 border border-[#C8A2FF]/40 rounded-lg hover:bg-[#7B2CBF]/30 transition">
              View Users
            </button>

            <button
              className="px-4 py-2 border border-[#C8A2FF]/40 rounded-lg hover:bg-[#7B2CBF]/30 transition"
              onClick={() => {
                navigate("/admin-profile/set-charity", { replace: true });
              }}
            >
              Manage Charity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
