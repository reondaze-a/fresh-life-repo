export default function GridCard({
  title,
  children,
  className,
}) {
  return (
    <div
      className={`max-w-sm w-full rounded-2xl bg-white/10 p-6 text-white shadow-lg mx-auto ${className ?? ""}`}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
