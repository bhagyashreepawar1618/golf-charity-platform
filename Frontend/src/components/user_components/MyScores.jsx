import { useEffect } from "react";
import { useUser } from "../../contexts/User.context.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyScores() {
  const { userscore, setUserScore } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem("UseraccessToken");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-scores`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUserScore(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A002B] text-white px-4 py-10">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-[#7B2CBF]/30 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#C8A2FF]">My Scores</h2>

          <button
            onClick={() => navigate("/profile")}
            className="text-sm border border-[#C8A2FF]/40 px-3 py-1 rounded-lg hover:bg-[#7B2CBF]/30 transition"
          >
            Back
          </button>
        </div>

        {/* No Scores */}
        {(!userscore || userscore.length === 0) && (
          <p className="text-center text-[#C8A2FF]/60">No scores added yet</p>
        )}

        {/* Scores List */}
        <div className="flex flex-col gap-4">
          {userscore?.map((s, index) => (
            <div
              key={index}
              className="bg-[#2A0A3D] p-4 rounded-xl flex justify-between items-center hover:scale-[1.02] transition"
            >
              {/* Left */}
              <div>
                <p className="text-sm text-[#C8A2FF]/60">#{index + 1}</p>

                <h3 className="text-lg font-semibold text-[#C8A2FF]">
                  Score: {s?.value || s}
                </h3>

                {/* Date */}
                <p className="text-xs text-[#C8A2FF]/50 mt-1">
                  {s?.date ? new Date(s.date).toLocaleDateString() : "No date"}
                </p>
              </div>

              {/* Badge */}
              <div className="text-[#C8A2FF] text-sm font-semibold bg-[#7B2CBF]/30 px-3 py-1 rounded-full">
                {s?.value || s}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        {userscore?.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-[#2A0A3D] p-4 rounded-xl text-center">
              <h3 className="text-xl font-bold text-[#C8A2FF]">
                {userscore.length}
              </h3>
              <p className="text-xs text-[#C8A2FF]/60">Total Scores</p>
            </div>

            <div className="bg-[#2A0A3D] p-4 rounded-xl text-center">
              <h3 className="text-xl font-bold text-[#C8A2FF]">
                {Math.round(
                  userscore.reduce((acc, s) => acc + (s?.value || s), 0) /
                    userscore.length,
                )}
              </h3>
              <p className="text-xs text-[#C8A2FF]/60">Average Score</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
