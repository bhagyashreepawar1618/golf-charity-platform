import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/User.context.jsx";

export default function Subscription() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [plan, setPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("UseraccessToken");

      const expiryDate =
        plan === "monthly"
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/set-subscription-details",
        {
          status: true,
          plan: plan,
          expiryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Subscription response:", res.data.data);
      setUser(res.data.data);

      alert("Subscription Successful ");

      navigate("/charity", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
        <h2 className="text-2xl font-bold text-center text-[#C8A2FF] mb-2">
          Choose Your Plan
        </h2>

        <p className="text-center text-[#C8A2FF]/60 text-sm mb-6">
          Subscribe & start winning while supporting charity 💜
        </p>

        {/* Plans */}
        <div className="flex flex-col gap-4">
          {/* Monthly */}
          <div
            onClick={() => setPlan("monthly")}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              plan === "monthly"
                ? "border-[#C8A2FF] bg-[#2A0A3D]"
                : "border-[#7B2CBF]/30"
            }`}
          >
            <h3 className="text-lg text-[#C8A2FF] font-semibold">
              Monthly Plan
            </h3>
            <p className="text-sm text-[#C8A2FF]/60">₹499 / month</p>
          </div>

          {/* Yearly */}
          <div
            onClick={() => setPlan("yearly")}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              plan === "yearly"
                ? "border-[#C8A2FF] bg-[#2A0A3D]"
                : "border-[#7B2CBF]/30"
            }`}
          >
            <h3 className="text-lg text-[#C8A2FF] font-semibold">
              Yearly Plan
            </h3>
            <p className="text-sm text-[#C8A2FF]/60">₹4999 / year (Save 20%)</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg font-semibold bg-[#C8A2FF] text-black hover:bg-[#7B2CBF] hover:text-white transition"
        >
          {loading ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
