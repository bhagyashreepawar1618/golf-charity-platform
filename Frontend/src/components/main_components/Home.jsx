import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A002B] text-[#C8A2FF] overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute w-96 h-96 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-0 left-0 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-28">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Play Golf. <span className="text-[#7B2CBF]">Win Big.</span>
          <br />
          Support What Matters.
        </h1>

        <p className="text-[#C8A2FF]/70 max-w-2xl mb-10 text-lg">
          Track your golf performance, participate in monthly draws, and
          contribute to meaningful charities — all in one premium subscription
          platform.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            className="px-8 py-3 bg-[#C8A2FF] text-black rounded-xl font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button className="px-8 py-3 border border-[#7B2CBF] rounded-xl hover:bg-[#4B0F73] transition transform hover:scale-105">
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto py-10">
        {[
          {
            title: "Track Performance",
            desc: "Manage your last 5 golf scores with an intuitive interface, see your progress instantly.",
          },
          {
            title: "Monthly Draws",
            desc: "Enter monthly prize draws and win real rewards based on your golf scores.",
          },
          {
            title: "Support Charity",
            desc: "A portion of your subscription goes to a charity of your choice, making a real impact.",
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

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: "Subscribe & Choose Charity",
              desc: "Select your subscription plan and pick a charity to support.",
            },
            {
              step: 2,
              title: "Enter Your Scores",
              desc: "Add your last 5 golf scores (Stableford format) to track progress.",
            },
            {
              step: 3,
              title: "Join Draws & Win",
              desc: "Participate in monthly draws and see if you win prizes based on your scores.",
            },
            {
              step: 4,
              title: "Draw & Rewards",
              desc: "Match 3, 4, or all 5 numbers from your latest scores. 5-number match wins the jackpot, 4-number match wins a fixed prize, 3-number match wins a smaller prize. Jackpot rolls over if unclaimed.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="p-6 rounded-xl bg-white/5 backdrop-blur border border-[#7B2CBF]/30 hover:scale-105 transition"
            >
              <div className="text-[#7B2CBF] text-3xl font-bold mb-3">
                {step}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[#C8A2FF]">
                {title}
              </h3>
              <p className="text-[#C8A2FF]/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="relative z-10 bg-white/5 backdrop-blur-lg border border-[#7B2CBF]/30 max-w-5xl mx-auto p-10 my-16 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4">Make a Real Impact</h2>
        <p className="text-[#C8A2FF]/70 mb-6">
          Your subscription not only improves your game but also helps fund
          meaningful charities every month. Track your impact in real-time and
          see the difference you make.
        </p>
        <button
          className="px-10 py-3 bg-[#C8A2FF] text-black rounded-xl font-semibold hover:bg-[#7B2CBF] hover:text-white transition transform hover:scale-105"
          onClick={() => navigate("/register")}
        >
          Subscribe Now
        </button>
      </section>
    </div>
  );
}
