export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
  autoComplete,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-zinc-300">
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder || label}
        className={[
          "w-full rounded-lg px-3 py-2 outline-none",
          "bg-black text-white placeholder:text-zinc-500",
          "focus:ring-2 focus:ring-orange-500",
          error ? "border border-red-500" : "border border-zinc-700",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </label>
  );
}
