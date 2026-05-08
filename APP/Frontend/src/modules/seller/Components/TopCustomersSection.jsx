import React from 'react';
import { Users } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

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

export default TopCustomersSection;