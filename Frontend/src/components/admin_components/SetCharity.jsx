import { useState } from "react";
import axios from "axios";

export default function AddCharity() {
  const token = localStorage.getItem("adminaccessToken");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.image) {
      return alert("All fields are required");
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/set-charity",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Charity created:", res.data);

      alert("Charity Added Successfully 💜");

      // reset
      setFormData({
        name: "",
        description: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error creating charity");
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
          Add Charity
        </h2>

        {/* Image Preview */}
        {preview && (
          <div className="flex justify-center mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-28 h-28 rounded-lg object-cover border-2 border-[#C8A2FF]"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Charity Name"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          {/* Image */}
          <input
            type="file"
            onChange={handleFileChange}
            className="text-sm text-[#C8A2FF]/70 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C8A2FF] file:text-black"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition"
          >
            {loading ? "Creating..." : "Add Charity"}
          </button>
        </form>
      </div>
    </div>
  );
}
