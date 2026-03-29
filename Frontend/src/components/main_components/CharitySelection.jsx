import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../contexts/User.context.jsx";

export default function SelectCharity() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("UseraccessToken");

  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [percentage, setPercentage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // FETCH CHARITIES FROM BACKEND
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        setFetchLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-charities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("charities=", res.data.data);
        setCharities(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching charities");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCharities();
  }, []);

  // SUBMIT SELECTED CHARITY
  const handleSubmit = async () => {
    if (!selectedCharity) return alert("Select a charity first");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/select-charity`,
        {
          charityId: selectedCharity,
          charityPercentage: percentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("response is this =", res.data.data);
      setUser(res.data.data);

      alert("Charity Selected ");
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Error selecting charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A002B] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-[#7B2CBF]/30 rounded-2xl p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-center text-[#C8A2FF] mb-2">
          Choose Your Charity
        </h2>

        {/*  Loading */}
        {fetchLoading ? (
          <p className="text-center text-[#C8A2FF]/60">Loading charities...</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-72 overflow-y-auto">
            {charities.map((c) => (
              <div
                key={c._id}
                onClick={() => setSelectedCharity(c._id)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer ${
                  selectedCharity === c._id
                    ? "bg-[#2A0A3D] border border-[#C8A2FF]"
                    : "bg-[#2A0A3D]/60"
                }`}
              >
                {/* Image */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                {/* Text */}
                <div>
                  <h3 className="text-[#C8A2FF] font-semibold text-sm">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#C8A2FF]/60">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Percentage */}
        <div className="mt-5">
          <label className="text-xs text-[#C8A2FF]/70">Contribution (%)</label>

          <input
            type="range"
            min="10"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full mt-2"
          />

          <p className="text-center text-[#C8A2FF] mt-1 text-sm">
            {percentage}%
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 py-3 rounded-lg font-semibold bg-[#C8A2FF] text-black"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
