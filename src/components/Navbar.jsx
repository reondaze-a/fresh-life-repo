import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ openLogoutModal }) {
  const { isLoggedIn, loading, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  // Lock background scroll on mobile when menu is open
  useEffect(() => {
    const { documentElement } = document;
    if (isOpen)
      documentElement.classList.add("overflow-hidden");
    else
      documentElement.classList.remove("overflow-hidden");
    return () =>
      documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {/* Overlay (keeps opacity animation) */}
      <div
        onClick={toggle}
        className={`fixed inset-0 md:hidden transition-opacity duration-300 z-40
        bg-black/60 ${
          isOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Navbar */}
      <nav
        className="relative z-50 flex items-center bg-[#0a0a0a] px-6 py-4 text-white transition-all"
        style={{
          borderBottomLeftRadius: isOpen ? "0" : "1rem",
          borderBottomRightRadius: isOpen ? "0" : "1rem",
        }}
      >
        {/* Logo left (always) */}
        <button
          className="text-xl font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          Fresh Life Church
        </button>

        {/* Center links (desktop only) */}
        <div className="hidden flex-1 justify-center gap-5 md:flex">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/sermons" className="hover:underline">
            Sermons
          </Link>
          <Link to="/events" className="hover:underline">
            Events
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>

        {/* Right side controls */}
        {/* If logged in, show Logout button first */}
        {isLoggedIn && (
          <button
            onClick={openLogoutModal}
            className="mr-1 hidden cursor-pointer rounded-md bg-transparent px-4 py-0.5 font-semibold text-white shadow transition hover:scale-105 active:scale-95 md:inline"
          >
            Logout
          </button>
        )}

        <div className="ml-auto flex items-center gap-3">
          {/* Login button (always visible) */}
          <button
            onClick={() => {
              navigate(
                `${isLoggedIn ? "/my-profile" : "/login"}`,
              );
              setIsOpen(false);
            }}
            className="rounded-md bg-white px-4 py-0.5 font-semibold text-orange-500 shadow transition hover:bg-gray-300 active:scale-95 cursor-pointer"
          >
            {`${loading ? "Loading..." : isLoggedIn ? "My profile" : "Login"}`}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown (slides + fades) */}
        <div
          className={`absolute left-0 top-full w-full bg-[#0a0a0a] text-center
          flex flex-col items-center overflow-hidden z-50
          transition-all duration-300 ease-out origin-top
          ${
            isOpen
              ? "opacity-100 translate-y-0 rounded-b-2xl"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <Link
            to="/"
            className="w-full py-3 hover:underline"
            onClick={toggle}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="w-full py-3 hover:underline"
            onClick={toggle}
          >
            About
          </Link>
          <Link
            to="/sermons"
            className="w-full py-3 hover:underline"
            onClick={toggle}
          >
            Sermons
          </Link>
          <Link
            to="/events"
            className="w-full py-3 hover:underline"
            onClick={toggle}
          >
            Events
          </Link>
          <Link
            to="/contact"
            className="w-full py-3 hover:underline"
            onClick={toggle}
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <button
              className="w-full py-3 hover:underline"
              onClick={() => {
                openLogoutModal();
                setIsOpen(false);
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/register"
              className="w-full py-3 hover:underline"
              onClick={toggle}
            >
              Sign up
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
