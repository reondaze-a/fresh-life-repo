type Props = { children: React.ReactNode, className?: string };

export default function ContentCard({ children, className }: Props) {
  return (
    <div
      className={`mt-8 rounded-2xl border border-zinc-800 p-6 shadow-sm ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
