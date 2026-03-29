import { useState } from "react";
import axios from "axios";

export default function Draw() {
  const [drawData, setDrawData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminaccessToken");

  const handleDraw = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/run-draw",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("draw result=", res.data.data);
      setDrawData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Error running draw");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A002B] text-white flex items-center justify-center px-4 py-10">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative w-full max-w-xl bg-white/5 backdrop-blur-xl border border-[#7B2CBF]/30 rounded-3xl p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-[#C8A2FF] mb-6">
          🎯 Run Lucky Draw
        </h2>

        {/* BUTTON */}
        <button
          onClick={handleDraw}
          disabled={loading}
          className="px-6 py-3 bg-[#C8A2FF] text-black rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition"
        >
          {loading ? "Drawing..." : "Run Draw"}
        </button>

        {/* DRAW NUMBERS */}
        {drawData?.drawNumbers && (
          <div className="mt-8">
            <h3 className="text-lg text-[#C8A2FF] mb-3">🎯 Draw Numbers</h3>

            <div className="flex justify-center gap-3 flex-wrap">
              {drawData.drawNumbers.map((num, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#7B2CBF] text-white font-bold text-lg shadow-md"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WINNERS */}
        {drawData?.winners && (
          <div className="mt-10">
            <h3 className="text-lg text-[#C8A2FF] mb-4">🏆 Winners</h3>

            {drawData.winners.length === 0 ? (
              <p className="text-[#C8A2FF]/60">No winners this time 😔</p>
            ) : (
              <div className="flex flex-col gap-4">
                {drawData.winners.map((w, index) => (
                  <div
                    key={index}
                    className="bg-[#2A0A3D] p-4 rounded-xl flex justify-between items-center border border-[#C8A2FF]/20"
                  >
                    <div className="text-left">
                      <h4 className="text-[#C8A2FF] font-semibold">{w.name}</h4>

                      <p className="text-xs text-[#C8A2FF]/60">
                        Matches: {w.matches}
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-[#7B2CBF]/30 text-[#C8A2FF] text-sm font-semibold">
                      {w.matches}/5
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
