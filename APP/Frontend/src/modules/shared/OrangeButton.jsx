export default function OrangeButton({ children, onClick, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 ${className}`}
    >
      {children}
    </button>
  )
}
