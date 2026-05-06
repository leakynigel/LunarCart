import { useMemo, useState } from 'react'
import { PlusCircle, Edit3, Trash2 } from 'lucide-react'
import OrangeButton from '../shared/OrangeButton'

const mockProducts = [
  { id: 'SP-001', name: 'Premium Lunar Lamp', stock: 24, price: 'Ksh 42.00' },
  { id: 'SP-002', name: 'Moonbeam Rug', stock: 12, price: 'Ksh 78.00' },
  { id: 'SP-003', name: 'Nebula Chair', stock: 8, price: 'Ksh 129.00' },
  { id: 'SP-004', name: 'Orbit Charger', stock: 39, price: 'Ksh 26.00' },
]

const metrics = [
  { label: 'Active Sales', value: 'Ksh 18.2K' },
  { label: 'Escrow Balance', value: 'Ksh 9.8K' },
  { label: 'Pending Shipment', value: '14 Orders' },
]

export default function SellerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sidebarLinks = useMemo(
    () => ['Dashboard', 'My Products', 'Orders', 'Payouts'],
    [],
  )

  const handleEdit = (product) => console.log(`Triggered Edit for ${product.name}`)
  const handleDelete = (product) => console.log(`Triggered Delete for ${product.name}`)
  const handleAddNew = () => setIsModalOpen(true)

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Seller</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">Store Management</h1>
          </div>
          <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500" /> Active Store
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <nav className="space-y-2">
            {sidebarLinks.map((link) => (
              <button
                key={link}
                type="button"
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={() => console.log(`Triggered Navigate ${link}`)}
              >
                {link}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Performance</p>
                <h2 className="text-2xl font-semibold text-brand-charcoal">Metrics</h2>
              </div>
              <OrangeButton onClick={handleAddNew} className="inline-flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add New Product
              </OrangeButton>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-brand-charcoal">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Inventory</p>
              <h2 className="text-xl font-semibold text-brand-charcoal">My Products</h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-t border-slate-200 even:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-brand-charcoal">{product.name}</td>
                      <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                      <td className="px-5 py-4 text-brand-orange">{product.price}</td>
                      <td className="px-5 py-4 space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          <Edit3 className="inline-block h-4 w-4" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
                          className="rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          <Trash2 className="inline-block h-4 w-4" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-brand-charcoal">Add New Product</h3>
                <p className="mt-2 text-sm text-slate-500">Fill in the details below and save.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-4 text-slate-700">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">Product Name</div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">Price</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">Description</div>
              <OrangeButton onClick={() => console.log('Triggered Save New Product')}>Save Product</OrangeButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
