import { NavLink } from "react-router-dom";

export default function Header() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-[#C8A2FF] text-black"
        : "text-[#C8A2FF] hover:bg-[#4B0F73] hover:text-white"
    }`;

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-[#1A002B]/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide text-[#C8A2FF]">
          Golf<span className="text-[#7B2CBF]">Charity</span>
        </h1>

        {/* Nav */}
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>

          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
