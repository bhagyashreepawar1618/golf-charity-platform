import axios from "axios";
import { useState } from "react";
import { useUser } from "../../contexts/User.context.jsx";
import { replace, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const token = localStorage.getItem("UseraccessToken");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    ProfilePicture: null,
  });

  const [preview, setPreview] = useState(null);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      ProfilePicture: file,
    });

    // preview image
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("ProfilePicture", formData.ProfilePicture);

    console.log("Form Data Ready:", formData);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-user-profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("User Profile updated successfully");
      setUser(res.data.data);
      navigate("/profile", { replace: true });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A002B] px-4">
      {/* Glow */}
      <div className="absolute w-80 h-80 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-[#7B2CBF]/30 shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#C8A2FF] mb-6">
          Update Profile
        </h2>

        {/* Preview */}
        <div className="flex justify-center mb-6">
          <img
            src={preview}
            alt="preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#7B2CBF]"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          {/* File Upload */}
          <input
            type="file"
            name="ProfilePicture"
            onChange={handleFileChange}
            className="text-sm text-[#C8A2FF]/70 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C8A2FF] file:text-black hover:file:bg-[#7B2CBF] hover:file:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
