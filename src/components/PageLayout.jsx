export default function PageLayout({ children, className }) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-8 animate-appear${className ?? ""}`}>
      {children}
    </section>
  );
}
