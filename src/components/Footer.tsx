export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-400">
        © {new Date().getFullYear()} Fresh Life Church
      </div>
    </footer>
  );
}
