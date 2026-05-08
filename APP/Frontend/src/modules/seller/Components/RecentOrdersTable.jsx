import React from 'react';
import { ChevronRight, Activity } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

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

const RecentOrdersTable = ({ orders = [], isLoading = false }) => {
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

export default RecentOrdersTable;