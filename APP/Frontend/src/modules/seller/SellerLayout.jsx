import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  LogOut,
  Home,
  Package,
  ShoppingCart,
  Users,
  FileText,
  DollarSign,
  Settings,
  MessageSquare,
  HelpCircle,
  Layers,
} from 'lucide-react';

/**
 * SellerLayout component provides the common structure for seller-facing pages,
 * including the sidebar, header, and persona switcher.
 * It takes children as props to render the specific page content.
 */
export default function SellerLayout({ children, onPersonaSwitch }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/seller' },
    { icon: Package, label: 'My Products', path: '/seller/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/seller/orders' },
    { icon: DollarSign, label: 'Payouts', path: '/seller/payouts' },
    { icon: Users, label: 'History', path: '/seller/history' },
    { icon: FileText, label: 'Reports', path: '/seller/reports' },
    { icon: Layers, label: 'Integrations', path: '/seller/integrations' },
    { icon: HelpCircle, label: 'Help', path: '/seller/help' },
    { icon: Settings, label: 'Settings', path: '/seller/settings' },
  ];

  const handlePersonaSwitchInternal = () => {
    console.log('Switching to buyer persona');
    if (onPersonaSwitch) {
      onPersonaSwitch('buyer');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Floating Persona Switcher Button */}
      <button
        onClick={handlePersonaSwitchInternal}
        className="fixed bottom-8 right-8 bg-brand-orange text-white px-6 py-3 rounded-full text-sm font-black shadow-2xl z-50 hover:scale-105 transition-transform"
      >
        Switch to Buyer UI
      </button>

      {/* ===== SIDEBAR ===== */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-200 border-r border-gray-300 flex flex-col transition-all duration-300 z-50 h-full fixed left-0 top-0 lg:static`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center font-black text-white text-xl">L</div>
          {sidebarOpen && <span className="font-black text-xl text-brand-charcoal tracking-tighter">LunarCart</span>}
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/seller'} // 'end' prop ensures exact match for the dashboard link
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all text-sm font-bold ${isActive ? 'bg-brand-orange text-white shadow-lg shadow-orange-100' : 'text-gray-600 hover:bg-orange-50 hover:text-[#FF6600]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={22} strokeWidth={isActive ? 3 : 2} />
                    {sidebarOpen && item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-8">
          <button onClick={() => console.log('Logout')} className="flex items-center gap-4 px-5 text-slate-400 font-black hover:text-red-500 transition-colors">
            <LogOut size={22} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* ===== TOP HEADER ===== */}
        <header className="bg-white px-10 py-5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-50">
          <div className="flex items-center gap-4 flex-1 max-w-2xl mr-auto">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-600">
              <Menu size={30} />
            </button>
            <div className="flex items-center gap-3 px-6 py-3 bg-gray-200 rounded-2xl w-full border border-slate-100">
              <Search size={20} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none flex-1 text-sm font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 pl-8">
            <button className="text-slate-400 hover:text-brand-orange transition-colors"><MessageSquare size={20} /></button>
            <button className="text-slate-400 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-orange rounded-full" />
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-base font-black text-brand-charcoal">Leaky Nigel</p>
                <p className="text-xs font-black text-slate-400 uppercase">Seller</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-2xl overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nigel" alt="Profile" />
              </div>
              <button className="text-gray-600 hover:text-brand-orange transition-colors p-1 ml-1">
                <Menu size={25} />
              </button>
            </div>
          </div>
        </header>

        {/* Page-specific content */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          {children}
        </div>
      </main>
    </div>
  );
}