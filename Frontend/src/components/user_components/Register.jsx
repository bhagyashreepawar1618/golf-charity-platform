import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // 🔥 NEW

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    ProfilePicture: null,
  });

  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // file
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ProfilePicture: e.target.files[0],
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("fullname", formData.fullname);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("ProfilePicture", formData.ProfilePicture);

      // 🔥 dynamic endpoint
      const endpoint =
        role === "admin"
          ? "http://localhost:8000/api/v1/admin/admin-register"
          : "http://localhost:8000/api/v1/user/register";

      const res = await axios.post(endpoint, data);

      console.log(res.data);

      alert(`${role} Registered Successfully 😤🔥`);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A002B] px-4">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-[#7B2CBF]/30 shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-[#C8A2FF] mb-6">
          Create Account
        </h2>

        {/* 🔥 ROLE TOGGLE */}
        <div className="flex mb-6 bg-[#4B0F73]/30 rounded-lg p-1">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-md text-sm ${
              role === "user" ? "bg-[#C8A2FF] text-black" : "text-[#C8A2FF]"
            }`}
          >
            User
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-md text-sm ${
              role === "admin" ? "bg-[#C8A2FF] text-black" : "text-[#C8A2FF]"
            }`}
          >
            Admin
          </button>
        </div>

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

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
          />

          <input
            type="file"
            name="ProfilePicture"
            onChange={handleFileChange}
            className="text-sm text-[#C8A2FF]/70"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition"
          >
            {loading ? "Registering..." : `Register as ${role}`}
          </button>
        </form>
      </div>
    </div>
  );
}
