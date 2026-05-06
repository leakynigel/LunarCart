import OrangeButton from '../shared/OrangeButton'

const disputeList = [
  { id: 'D-115', buyer: 'Luna', seller: 'Orbit Co.', amount: 'Ksh 320.00', status: 'Pending' },
  { id: 'D-118', buyer: 'Nova', seller: 'Starlight Ltd.', amount: 'Ksh 540.00', status: 'Pending' },
  { id: 'D-121', buyer: 'Celeste', seller: 'MoonMart', amount: 'Ksh 119.00', status: 'Pending' },
]

export default function AdminPanel() {
  const handleApprove = (dispute) => console.log(`Triggered Approve payout for ${dispute.id}`)
  const handleReject = (dispute) => console.log(`Triggered Reject payout for ${dispute.id}`)

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Admin</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">Dispute Management</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="inline-block h-3 w-3 rounded-full bg-brand-orange" /> {disputeList.length} Pending
          </div>
        </div>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending Disputes</p>
            <h2 className="text-xl font-semibold text-brand-charcoal">Payout Approvals</h2>
          </div>
          <OrangeButton onClick={() => console.log('Triggered Refresh Dispute List')}>Refresh List</OrangeButton>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">Dispute ID</th>
                <th className="px-5 py-4">Buyer</th>
                <th className="px-5 py-4">Seller</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {disputeList.map((dispute) => (
                <tr key={dispute.id} className="border-t border-slate-200 even:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-brand-charcoal">{dispute.id}</td>
                  <td className="px-5 py-4">{dispute.buyer}</td>
                  <td className="px-5 py-4">{dispute.seller}</td>
                  <td className="px-5 py-4 text-brand-orange font-semibold">{dispute.amount}</td>
                  <td className="px-5 py-4 space-x-2">
                    <OrangeButton onClick={() => handleApprove(dispute)} className="px-3 py-2 text-xs">Approve</OrangeButton>
                    <button
                      type="button"
                      onClick={() => handleReject(dispute)}
                      className="rounded-2xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
