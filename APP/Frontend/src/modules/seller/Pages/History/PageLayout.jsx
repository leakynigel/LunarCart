import React, { useState } from 'react';
import { Search, Plus, Filter, Star } from 'lucide-react';

/**
 * History Page Layout for Seller Module.
 * Features a 300px grey header, toggleable views for Customer History and Seller Activity,
 * and high-fidelity tables for data display.
 */
const PageLayout = () => {
  const [view, setView] = useState('customer'); // 'customer' or 'seller'

  return (
    <div className="flex flex-col min-h-full">
      {/* ===== GREY HEADER SECTION (300px) ===== */}
      <div className="h-[300px] bg-gray-300 p-10 flex flex-col justify-between">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-10">
          {/* Left Side: Actions & Filters */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('customer')}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black shadow-lg transition-all active:scale-95 ${
                view === 'customer' 
                  ? 'bg-brand-orange text-white shadow-orange-100' 
                  : 'bg-white text-brand-charcoal hover:bg-gray-50 shadow-gray-100'
              }`}
            >
              <Plus size={20} strokeWidth={3} /> Customer
            </button>
            <button 
              onClick={() => setView('seller')}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-black shadow-lg transition-all active:scale-95 ${
                view === 'seller' 
                  ? 'bg-brand-orange text-white shadow-orange-100' 
                  : 'bg-white text-brand-charcoal hover:bg-gray-50 shadow-gray-100'
              }`}
            >
              <Plus size={20} strokeWidth={3} /> Seller
            </button>
            <button className="flex items-center gap-3 bg-white text-slate-500 px-6 py-3 rounded-2xl text-sm font-black shadow-lg shadow-gray-100 hover:bg-gray-50 transition-all active:scale-95">
              <Filter size={20} strokeWidth={3} /> Filter
            </button>
          </div>

          {/* Right Side: Global Search */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-4 px-8 py-4 bg-white rounded-3xl shadow-2xl shadow-gray-300/20 border border-gray-100 group transition-all focus-within:ring-4 focus-within:ring-orange-50">
              <Search size={22} className="text-slate-300 group-focus-within:text-brand-orange transition-colors" />
              <input
                type="text"
                placeholder="Search by name, TID, or Log ID..."
                className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-brand-charcoal placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Heading Section */}
        <div className="space-y-8">
          <h1 className="text-4xl font-black text-brand-charcoal tracking-tighter">
            Operation History
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-brand-orange rounded-full" />
            <p className="text-slate-500 font-black text-xs uppercase tracking-[0.2em]">
              {view === 'customer' ? 'External Buyer Transactions' : 'Internal System Activity (Read-Only)'}
            </p>
          </div>
        </div>
      </div>

      {/* ===== DATA SHEET SECTION ===== */}
      <div className="px-10 -mt-16 pb-12">
        <div className="bg-white rounded-[rem] shadow-2xl shadow-gray-600/30 border border-slate-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="pl-10 pr-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400 w-16">#</th>
                  {view === 'customer' ? (
                    <>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Buyer's Name</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">TID</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Event Type</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Item Details</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Payment</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Rating</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Log ID</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Category</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Action Taken</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Affected SKU</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Value Change</th>
                      <th className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Cr/Db</th>
                      <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Balance</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/80 transition-all duration-300">
                    <td className="pl-10 pr-4 py-6 text-xs font-black text-slate-300 group-hover:text-brand-orange transition-colors">{idx + 1}</td>
                    {view === 'customer' ? (
                      <>
                        <td className="px-4 py-6 text-sm font-black text-brand-charcoal underline underline-offset-4 decoration-slate-200">Buyer-{idx + 100}</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 font-mono italic">#TID-{1000 + idx}</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 italic">2024-05-08 18:45</td>
                        <td className="px-4 py-6 text-[11px] font-black text-brand-orange uppercase tracking-tighter">Purchase</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-500">LunarCart Item Details...</td>
                        <td className="px-4 py-6 text-sm font-black text-brand-charcoal">Ksh 0.00</td>
                        <td className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-tighter">Digital Wallet</td>
                        <td className="px-4 py-6 text-[10px] font-black text-green-500 uppercase tracking-widest italic">Delivered</td>
                        <td className="px-10 py-6 text-center text-xs font-black text-slate-700 italic flex items-center justify-center gap-1">
                          <Star size={12} fill="#FFB800" stroke="none" /> 5.0
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 font-mono italic opacity-60">#LOG-{5000 + idx}</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 italic opacity-60">2024-05-08 18:45</td>
                        <td className="px-4 py-8 text-[11px] font-black uppercase tracking-widest text-slate-300 italic opacity-60">ACID Log</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-500 opacity-60">Action Registered...</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 font-mono opacity-60">SKU-000</td>
                        <td className="px-4 py-6 text-[11px] font-bold text-slate-400 opacity-60">No Change</td>
                        <td className="px-4 py-6 text-center text-[10px] font-black text-slate-300 uppercase italic opacity-60">Neutral</td>
                        <td className="px-10 py-6 text-sm font-black text-brand-charcoal italic opacity-30">Ksh 0.00</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;