export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A002B] px-4">
      {/* Glow Background */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-[#7B2CBF]/30 shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-[#C8A2FF] mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />

          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-transparent border border-[#7B2CBF]/40 text-[#C8A2FF] placeholder:text-[#C8A2FF]/60 focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />

          {/* File Upload */}
          <input
            type="file"
            className="text-sm text-[#C8A2FF]/70 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C8A2FF] file:text-black hover:file:bg-[#7B2CBF] hover:file:text-white"
          />

          <button className="mt-4 bg-[#C8A2FF] text-black py-3 rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
