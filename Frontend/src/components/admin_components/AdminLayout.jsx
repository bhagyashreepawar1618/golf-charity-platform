import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-[#C8A2FF] text-black"
        : "text-[#C8A2FF] hover:bg-[#7B2CBF]/30"
    }`;

  return (
    <div className="min-h-screen flex bg-[#1A002B] text-white">
      {/*  MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-[#1A002B] border-b border-[#7B2CBF]/30 z-50">
        <h2 className="text-lg font-bold text-[#C8A2FF]">Admin</h2>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#C8A2FF] text-2xl"
        >
          ☰
        </button>
      </div>

      {/*  SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#1A002B] border-r border-[#7B2CBF]/30 p-6 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-[#C8A2FF] mb-8 hidden md:block">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2 mt-10 md:mt-0">
          <NavLink
            to="/admin-profile/admin-dashboard"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/draws"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Draws
          </NavLink>

          <NavLink
            to="/admin/scores"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Scores
          </NavLink>

          <NavLink
            to="/admin/charities"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Charities
          </NavLink>

          <NavLink
            to="/admin/winners"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Winners
          </NavLink>
        </nav>
      </div>

      {/* OVERLAY (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-8 mt-14 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
}
