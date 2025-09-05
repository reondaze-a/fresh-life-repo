export default function ContentCard({
  children,
  className,
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center py-12 px-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
