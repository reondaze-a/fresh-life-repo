
export default function GridCard({ title, children, className }) {
  return (
    <div className={`rounded-2xl border border-zinc-800 p-5 ${className ?? ""}`}>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <div className="text-zinc-300">{children}</div>
    </div>
  );
}
