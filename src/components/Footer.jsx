import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-400 space-y-6">
        {/* Top navigation links */}
        <nav className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <Link href="/watch" className="hover:text-white transition">
            Watch
          </Link>
          <Link
            href="/locations"
            className="hover:text-white transition"
          >
            Locations
          </Link>
          <Link href="/give" className="hover:text-white transition">
            Give
          </Link>
          <Link href="/tools" className="hover:text-white transition">
            Tools
          </Link>
          <Link
            href="/for-churches"
            className="hover:text-white transition"
          >
            For Churches
          </Link>
          <Link
            href="/careers"
            className="hover:text-white transition"
          >
            Careers
          </Link>
          <Link href="/shop" className="hover:text-white transition">
            Shop
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition"
          >
            Contact Us
          </Link>
        </nav>

        {/* Divider */}
        <div className="border-t border-zinc-700"></div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Copyright + policies */}
          <div className="space-y-2 flex flex-col items-center sm:space-y-0 sm:space-x-4 sm:flex gap-1">
            <span>
              © {new Date().getFullYear()} Fresh Life Church. All
              rights reserved.
            </span>
            <Link
              href="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition"
            >
              Terms of Use
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition"
            >
              Cookie Preferences
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 text-lg justify-center">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="hover:text-white transition"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-white transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
