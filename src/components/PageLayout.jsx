export default function PageLayout({
  children,
  className,
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-[#0a0a0a] animate-appear ${className}`}
    >
      {children}
    </main>
  );
}
