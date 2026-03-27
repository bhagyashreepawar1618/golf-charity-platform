export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A002B] px-4 overflow-hidden">
      {/* 🌌 Glow Effects */}
      <div className="absolute w-80 h-80 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* 💎 Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-[#7B2CBF]/30 shadow-2xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#C8A2FF] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-[#C8A2FF]/60 mb-6 text-sm">
          Login to continue your journey
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#C8A2FF]/70">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#C8A2FF]/70">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF] transition"
            />
          </div>

          {/* Forgot */}
          <div className="text-right text-sm text-[#C8A2FF]/60 hover:text-white cursor-pointer">
            Forgot Password?
          </div>

          {/* Button */}
          <button className="mt-2 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105 shadow-lg">
            Login
          </button>
        </form>

        {/* Bottom text */}
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
