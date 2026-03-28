import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/User.context.jsx";
import { useAdmin } from "../../contexts/Admin.context.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setAdmin } = useAdmin();

  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint =
        role === "admin"
          ? "http://localhost:8000/api/v1/admin/login-admin"
          : "http://localhost:8000/api/v1/user/login";

      const res = await axios.post(endpoint, {
        username: formData.username,
        password: formData.password,
      });

      // store tokens
      if (role == "user") {
        localStorage.setItem("UseraccessToken", res.data.data.accessToken);
        localStorage.setItem("UserRefreshToken", res.data.data.refreshToken);
        setUser(res.data.data.user);
      } else {
        localStorage.setItem("adminaccessToken", res.data.data.accessToken);
        localStorage.setItem("adminrefreshToken", res.data.data.refreshToken);
        setAdmin(res.data.data.admin);
      }

      alert(`${role} Login Successful`);

      //  NAVIGATION
      if (role === "admin") {
        navigate("/admin-profile");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A002B] px-4 overflow-hidden">
      {/* Glow */}
      <div className="absolute w-80 h-80 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-[#7B2CBF]/30 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-[#C8A2FF] mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-[#C8A2FF]/60 mb-6 text-sm">
          Login to continue your journey
        </p>

        {/* ROLE TOGGLE */}
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#C8A2FF]/70">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter your username"
              className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#C8A2FF]/70">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105 shadow-lg"
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </button>
        </form>

        <p className="text-center text-sm text-[#C8A2FF]/60 mt-6">
          Don’t have an account?{" "}
          <span className="text-[#7B2CBF] hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
