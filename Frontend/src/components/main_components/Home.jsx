export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A002B] text-[#C8A2FF] overflow-hidden">
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-96 h-96 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

      {/* 🔥 HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-28">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Play Golf. <span className="text-[#7B2CBF]">Win Big.</span>
          <br />
          Support What Matters.
        </h1>

        <p className="text-[#C8A2FF]/70 max-w-2xl mb-10 text-lg">
          Track your golf performance, participate in monthly prize draws, and
          contribute to meaningful charities — all in one premium platform.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button className="px-8 py-3 bg-[#C8A2FF] text-black rounded-xl font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105 shadow-lg">
            Get Started
          </button>

          <button className="px-8 py-3 border border-[#7B2CBF] rounded-xl hover:bg-[#4B0F73] transition transform hover:scale-105">
            Learn More
          </button>
        </div>
      </section>

      {/* ⚡ FEATURES */}
      <section className="relative z-10 grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto py-10">
        {[
          {
            title: "Track Performance",
            desc: "Easily manage your last 5 golf scores with a smooth and intuitive UI.",
          },
          {
            title: "Monthly Draws",
            desc: "Participate in exciting monthly draws and win real rewards.",
          },
          {
            title: "Support Charity",
            desc: "A portion of your subscription goes to your chosen charity.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-[#7B2CBF]/30 shadow-lg hover:scale-105 hover:shadow-[#7B2CBF]/40 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#C8A2FF]">
              {item.title}
            </h3>
            <p className="text-[#C8A2FF]/70 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 🧠 HOW IT WORKS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="p-6 rounded-xl bg-white/5 backdrop-blur border border-[#7B2CBF]/30 hover:scale-105 transition"
            >
              <div className="text-[#7B2CBF] text-3xl font-bold mb-3">
                {step}
              </div>
              <p className="text-[#C8A2FF]/70">
                {step === 1 && "Subscribe and choose your charity"}
                {step === 2 && "Enter your latest golf scores"}
                {step === 3 && "Join draws and win rewards"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 💥 CTA */}
      <section className="relative z-10 flex justify-center px-6 pb-20">
        <div className="w-full max-w-3xl text-center p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-[#7B2CBF]/30 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Play & Make an Impact?
          </h2>

          <p className="text-[#C8A2FF]/70 mb-6">
            Join today and become part of something bigger.
          </p>

          <button className="px-10 py-3 bg-[#C8A2FF] text-black rounded-xl font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105">
            Subscribe Now
          </button>
        </div>
      </section>
    </div>
  );
}
