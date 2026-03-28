import { useUser } from "../../contexts/User.context.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A002B] text-white px-4 py-10">
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-[#7B2CBF] opacity-20 blur-3xl rounded-full top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-[#C8A2FF] opacity-10 blur-3xl rounded-full bottom-20 right-20"></div>

      {/* Card */}
      <div className="relative max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-[#7B2CBF]/30 rounded-3xl p-8 shadow-2xl">
        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Image */}
            <div className="relative">
              <img
                src={user?.ProfilePicture}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#7B2CBF]"
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#C8A2FF] animate-pulse"></div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#C8A2FF]">
                {user?.fullname}
              </h2>

              <p className="text-[#C8A2FF]/60">@{user?.username}</p>
              <p className="text-sm mt-2 text-[#C8A2FF]/70">{user?.email}</p>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-[#7B2CBF]/30 text-[#C8A2FF] text-xs">
                Active Member
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/add-score")}
            className="px-5 py-2 bg-[#C8A2FF] text-black rounded-lg hover:bg-[#7B2CBF] hover:text-white transition shadow-md"
          >
            + Add Score
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-[#2A0A3D] p-4 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-[#C8A2FF]">5</h3>
            <p className="text-xs text-[#C8A2FF]/60">Scores</p>
          </div>

          <div className="bg-[#2A0A3D] p-4 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-[#C8A2FF]">12</h3>
            <p className="text-xs text-[#C8A2FF]/60">Draws Joined</p>
          </div>

          <div className="bg-[#2A0A3D] p-4 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-[#C8A2FF]">₹0</h3>
            <p className="text-xs text-[#C8A2FF]/60">Total Won</p>
          </div>

          <div className="bg-[#2A0A3D] p-4 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold text-[#C8A2FF]">10%</h3>
            <p className="text-xs text-[#C8A2FF]/60">Charity</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-center md:justify-end gap-4 mt-10">
          <button
            className="px-5 py-2 bg-[#C8A2FF] text-black rounded-lg hover:bg-[#7B2CBF] hover:text-white transition"
            onClick={() => {
              navigate("/update-user-profile", { replace: true });
            }}
          >
            Edit Profile
          </button>

          <button className="px-5 py-2 border border-[#C8A2FF]/40 rounded-lg hover:bg-[#7B2CBF]/30 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
