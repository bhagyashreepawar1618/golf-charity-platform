import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User.context.jsx";

export default function AddScore() {
  const { setUserScore } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("UseraccessToken");

  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!score) return alert("Enter score");
    if (score < 1 || score > 45) {
      return alert("Score must be between 1 and 45");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/add-score`,
        {
          score: Number(score),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUserScore(res.data.data);

      alert("Score added successfully ");

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error adding score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A002B] flex items-center justify-center px-4 py-10">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-[#7B2CBF]/30 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-center text-[#C8A2FF] mb-4">
          Add Your Score
        </h2>

        <p className="text-center text-[#C8A2FF]/60 text-sm mb-6">
          Enter your latest Stableford score (1–45)
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Score Input */}
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score (1–45)"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] focus:outline-none focus:border-[#C8A2FF]"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition"
          >
            {loading ? "Saving..." : "Add Score"}
          </button>
        </form>
      </div>
    </div>
  );
}
