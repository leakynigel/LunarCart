import { useState, useMemo } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import {
  BarChart3,
  CreditCard,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCircle,
} from 'lucide-react'
import AdminPanel from './modules/admin/AdminPanel'
import BuyerLanding from './modules/buyer/BuyerLanding'
import LogisticsHub from './modules/transport/LogisticsHub'
import SellerDashboard from './modules/seller/SellerDashboard'
import SupportCenter from './modules/support/SupportCenter'
import SystemControl from './modules/superadmin/SystemControl'

const rolePages = [
  { id: 'buyer', label: 'Buyer', icon: ShoppingCart, component: BuyerLanding, description: 'Shop with escrow protection' },
  { id: 'seller', label: 'Seller', icon: CreditCard, component: SellerDashboard, description: 'Manage your store' },
  { id: 'transport', label: 'Transport', icon: Truck, component: LogisticsHub, description: 'Logistics & shipping' },
  { id: 'support', label: 'Support', icon: Heart, component: SupportCenter, description: 'Help & support' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, component: AdminPanel, description: 'Dispute management' },
  { id: 'superadmin', label: 'Superadmin', icon: BarChart3, component: SystemControl, description: 'System control' },
]

function RoleSelector() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-surface px-4 py-12">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Welcome to</p>
        <h1 className="text-5xl font-bold text-brand-charcoal">LunarCart</h1>
        <p className="text-lg text-slate-600">Select your role to continue</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rolePages.map((role) => {
          const Icon = role.icon
          return (
            <Link
              key={role.id}
              to={`/${role.id}`}
              className="group rounded-3xl border-2 border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-brand-orange hover:shadow-md"
            >
              <Icon className="mb-3 h-8 w-8 text-brand-orange transition group-hover:scale-110" />
              <h3 className="text-lg font-semibold text-brand-charcoal">{role.label}</h3>
              <p className="mt-2 text-sm text-slate-600">{role.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function PersonaSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  if (location.pathname === '/') return null

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="mb-4 flex flex-col gap-2 rounded-[2rem] bg-white p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Quick Switch</p>
          {rolePages.map((role) => {
            const Icon = role.icon
            return (
              <Link
                key={role.id}
                to={`/${role.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-orange transition"
              >
                <Icon className="h-4 w-4" />
                {role.label}
              </Link>
            )
          })}
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-brand-charcoal px-6 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105 active:scale-95"
      >
        <UserCircle className="h-5 w-5 text-brand-orange" />
        Persona Switcher
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-charcoal">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<RoleSelector />} />
          {rolePages.map((role) => {
            const Component = role.component
            return <Route key={role.id} path={`/${role.id}`} element={<Component />} />
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <PersonaSwitcher />
    </div>
  )
}

export default App
