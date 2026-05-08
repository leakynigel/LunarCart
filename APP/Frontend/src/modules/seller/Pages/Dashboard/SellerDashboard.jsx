/**
 * LunarCart Seller Dashboard - High-Fidelity Static Component
 * 
 * A production-ready React component featuring:
 * - 4 metric cards with trend indicators
 * - Revenue analytics line chart
 * - Monthly target progress gauge
 * - Recent orders table with status badges
 * - Top customers list with avatars
 * - Responsive design (mobile, tablet, desktop)
 * - Loading skeletons with pulse animation
 * - Empty state handling
 * - Persona switcher for dev testing
 * 
 * @component
 * @example
 * import SellerDashboard from '@/modules/seller/SellerDashboard'
 * export default function Page() {
 *   return <SellerDashboard />
 * }
 */

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ShoppingCart,
  Users,
  FileText,
  DollarSign,
  Settings,
  Eye,
  Activity,
} from 'lucide-react';
import { MOCK_DATA, formatKsh, getTrendColor } from '../../seller.constants';
import SellerLayout from '../../SellerLayout'; // Import the new layout component

/**
 * Skeleton component for loading states
 * Renders a pulsing gray placeholder matching section layout
 */
const SkeletonLoader = ({ height = 'h-32', className = '' }) => (
  <div
    className={`bg-slate-200 rounded-lg animate-pulse ${height} ${className}`}
  />
);

/**
 * Stat card component with trend indicator
 */
const StatCard = ({ title, value, trend, isLoading = false }) => {
  const trendColor = getTrendColor(trend?.direction);
  if (isLoading) {
    return <SkeletonLoader height="h-32" className="rounded-[2rem]" />;
  }
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <h3 className="text-slate-400 font-bold text-[10px] mb-2 uppercase tracking-widest">{title}</h3>
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg font-black text-brand-charcoal whitespace-nowrap">
          {typeof value === 'number' ? formatKsh(value) : value}
        </p>
        <div className={`px-2 py-1 rounded-full text-[9px] font-black ${trendColor.bgColor} ${trendColor.textColor} flex-shrink-0`}>
          {trend?.direction === 'up' ? '+' : '-'}{trend?.value}%
        </div>
      </div>
    </div>
  );
};

/**
 * Custom tooltip for revenue chart
 */
const RevenueTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-50">
        <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Revenue</p>
        <p className="text-brand-charcoal font-black text-sm">{formatKsh(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

/**
 * Status badge component for orders
 */
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Shipped: 'bg-green-100 text-green-800 border-green-200',
    Canceled: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        statusStyles[status] || 'bg-slate-100 text-slate-800'
      }`}
    >
      {status}
    </span>
  );
};

/**
 * Recently updated orders table or skeleton
 */
const RecentOrdersSection = ({ orders = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <SkeletonLoader height="h-8" className="w-1/3" />
        </div>
        {[...Array(5)].map((_, i) => (
          <SkeletonLoader
            key={i}
            height="h-12"
            className="mb-3 w-full"
          />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
        <Activity size={48} className="text-slate-300 mb-4" />
        <p className="text-slate-500 text-center">
          No orders found. Your recent orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-brand-charcoal">
          Recent Orders
        </h3>
        <button
          onClick={() => console.log('View all orders')}
          className="text-brand-orange hover:text-[#e65c00] font-semibold text-sm flex items-center gap-1"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-slate-700 font-medium">
                  {order.product}
                </td>
                <td className="py-4 px-4 text-sm text-slate-700">
                  {order.customer}
                </td>
                <td className="py-4 px-4 text-sm font-mono text-slate-600">
                  {order.id}
                </td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  {new Date(order.date).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-4 px-4 text-sm">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Top customers section with avatars and view buttons
 */
const TopCustomersSection = ({ customers = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <SkeletonLoader height="h-8" className="w-1/3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoader
              key={i}
              height="h-32"
              className="w-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
        <Users size={48} className="text-slate-300 mb-4" />
        <p className="text-slate-500 text-center">
          No top customers yet. Start selling to see top customers here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-brand-charcoal mb-6">
        Top Customers
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            {/* Avatar */}
            <div
              className={`${customer.avatarBg} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 shadow-sm`}
            >
              {customer.avatar}
            </div>

            {/* Name */}
            <h4 className="font-semibold text-slate-800 text-sm mb-1">
              {customer.name}
            </h4>

            {/* Order count */}
            <p className="text-xs text-slate-500 mb-3">
              {customer.orderCount} orders
            </p>

            {/* View button */}
            <button
              onClick={() =>
                console.log('View customer:', customer.id, customer.name)
              }
              className="text-xs bg-brand-orange hover:bg-[#e65c00] text-white px-3 py-1 rounded-full font-semibold transition-colors active:scale-95"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Orange Rectangular Button Component
 */
const OrangeButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-brand-orange text-white px-6 py-3 rounded-lg text-sm font-black shadow-md hover:shadow-lg hover:bg-[#e65c00] transition-all active:scale-95"
  >
    {label}
  </button>
);

/**
 * Main SellerDashboard component
 * @param {Object} props
 * @param {Object} props.mockData - Optional mock data (defaults to MOCK_DATA)
 * @param {Function} props.onPersonaSwitch - Optional callback for persona switching
 */
export default function SellerDashboard({
  mockData = MOCK_DATA,
  onPersonaSwitch = null,
} = {}) {
  // State management
  const [isLoaded, setIsLoaded] = useState(true);

  // Simulate loading on mount (optional)
  // useEffect(() => {
  //   setIsLoaded(false);
  //   const timer = setTimeout(() => setIsLoaded(true), 2000);
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <SellerLayout onPersonaSwitch={onPersonaSwitch}>
      <div className="p-10 max-w-[1600px] mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Sales" value={mockData.stats.totalSales} trend={mockData.trends.sales} isLoading={!isLoaded} />
              <StatCard title="Total Orders" value={mockData.stats.totalOrders} trend={mockData.trends.orders} isLoading={!isLoaded} />
              <StatCard title="Total Visitors" value={mockData.stats.totalVisitors} trend={mockData.trends.visitors} isLoading={!isLoaded} />
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              {!isLoaded ? <SkeletonLoader height="h-[400px]" /> : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black text-brand-charcoal">Revenue Analytics</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brand-orange" /> <span className="text-xs font-bold text-slate-400">Revenue</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-slate-300 border-dashed" /> <span className="text-xs font-bold text-slate-400">Order</span></div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={mockData.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 700}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 700}} />
                      <Tooltip content={<RevenueTooltip />} />
                      <Line type="monotone" dataKey="revenue" stroke="#FF6600" strokeWidth={4} dot={{r: 6, fill: '#FF6600', strokeWidth: 3, stroke: '#fff'}} />
                      <Line type="monotone" dataKey="orders" stroke="#CBD5E1" strokeWidth={3} strokeDasharray="8 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="font-black mb-6">Active User</h4>
                {!isLoaded ? <SkeletonLoader height="h-48" /> : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockData.activeUserData}>
                      <Bar dataKey="users" fill="#FF6600" radius={[4, 4, 0, 0]} barSize={20} />
                      <XAxis dataKey="time" hide />
                      <Tooltip cursor={{fill: 'transparent'}} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="font-black mb-6">Conversion Rate</h4>
                {!isLoaded ? <SkeletonLoader height="h-48" /> : (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockData.conversionData}>
                      <Line type="monotone" dataKey="rate" stroke="#FF6600" strokeWidth={4} dot={false} />
                      <XAxis dataKey="date" hide />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black mb-8">Top Categories</h3>
              {!isLoaded ? <SkeletonLoader height="h-64" /> : (
                <div className="relative flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={mockData.categoryBreakdown} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                        {mockData.categoryBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Sales</p>
                    <p className="text-xl font-black text-brand-charcoal">{formatKsh(mockData.categoryTotal)}</p>
                  </div>
                  <div className="w-full mt-6 space-y-4">
                    {mockData.categoryBreakdown.map(cat => (
                      <div key={cat.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-md" style={{backgroundColor: cat.fill}} /> <span className="text-sm font-bold text-slate-500">{cat.name}</span></div>
                        <span className="text-sm font-black text-brand-charcoal">{Math.round((cat.value / mockData.categoryTotal) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden text-center">
              <h3 className="text-lg font-black mb-6 text-left">Monthly Target</h3>
              {!isLoaded ? <SkeletonLoader height="h-64" /> : (
                <div className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart cx="50%" cy="100%" innerRadius="150%" outerRadius="200%" barSize={15} data={[{value: mockData.monthlyTarget.percentage, fill: '#FF6600'}]} startAngle={180} endAngle={0}>
                      <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                      <RadialBar background clockWise dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute top-[160px] text-center">
                    <p className="text-4xl font-black text-brand-charcoal">{mockData.monthlyTarget.percentage}%</p>
                    <p className="text-sm font-bold text-green-500 mt-2">Great Progress!</p>
                  </div>
                  <div className="w-full mt-10 grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                    <div className="text-center"><p className="text-[10px] font-black text-slate-400 uppercase">Target</p><p className="text-sm font-black">{formatKsh(mockData.monthlyTarget.goal)}</p></div>
                    <div className="text-center"><p className="text-[10px] font-black text-slate-400 uppercase">Revenue</p><p className="text-sm font-black text-brand-orange">{formatKsh(mockData.monthlyTarget.current)}</p></div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black mb-6">Traffic Sources</h3>
              {!isLoaded ? <SkeletonLoader height="h-48" /> : (
                <div className="space-y-6">
                  {mockData.trafficSources.map(source => (
                    <div key={source.name} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold"><span className="text-slate-500">{source.name}</span><span className="text-brand-charcoal">{source.value}%</span></div>
                      <div className="w-full h-2 bg-slate-50 rounded-full"><div className="h-full bg-brand-orange rounded-full" style={{width: `${source.value}%`}} /></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== SECTION D: RECENT ORDERS & TOP CUSTOMERS (SIDE BY SIDE) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <RecentOrdersSection
            orders={mockData.recentOrders}
            isLoading={!isLoaded}
          />
          <TopCustomersSection
            customers={mockData.topCustomers}
            isLoading={!isLoaded}
          />
        </div>

        {/* Spacer for floating button */}
        <div className="h-20" />
      </div>
    </SellerLayout>
  );
}
