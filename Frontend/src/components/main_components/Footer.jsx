import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#1A002B] text-[#C8A2FF] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            Golf<span className="text-[#7B2CBF]">Charity</span>
          </h2>
          <p className="text-[#C8A2FF]/80 text-sm leading-relaxed">
            Track your golf performance, win exciting rewards, and support
            meaningful charities — all in one premium platform.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm uppercase mb-4 text-[#7B2CBF]">Navigation</h3>
          <div className="flex flex-col gap-2">
            <NavLink to="/" className="hover:text-white transition">
              Home
            </NavLink>
            <NavLink to="/register" className="hover:text-white transition">
              Register
            </NavLink>
            <NavLink to="/login" className="hover:text-white transition">
              Login
            </NavLink>
          </div>
        </div>

        {/* CTA */}
        <div>
          <h3 className="text-sm uppercase mb-4 text-[#7B2CBF]">Get Started</h3>
          <p className="text-[#C8A2FF]/80 text-sm mb-5">
            Join monthly draws, win rewards, and make an impact.
          </p>

          <button
            className="px-6 py-2 bg-[#C8A2FF] text-black rounded-lg font-semibold hover:bg-[#7B2CBF] hover:text-white transition"
            onClick={() => {
              navigate("/subscribe");
            }}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-[#C8A2FF]/70">
        © {new Date().getFullYear()} Golf Charity Platform. All rights reserved.
      </div>
    </footer>
  );
}
