export default function Input({ label, className = '', ...props }) {
  return (
    <label className={`block text-sm text-slate-800 ${className}`}>
      {label ? <span className="mb-2 block font-medium">{label}</span> : null}
      <input
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-orange-200"
        {...props}
      />
    </label>
  )
}
