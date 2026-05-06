import { Circle, PackageCheck, MapPin, Truck } from 'lucide-react'
import OrangeButton from '../shared/OrangeButton'

const shipmentQueue = [
  { id: 'ORD-1198', pickup: 'Austin', destination: 'San Diego', status: 'PICKED_UP' },
  { id: 'ORD-1204', pickup: 'Denver', destination: 'Seattle', status: 'IN_TRANSIT' },
  { id: 'ORD-1210', pickup: 'Miami', destination: 'Atlanta', status: 'DELIVERED' },
  { id: 'ORD-1215', pickup: 'Chicago', destination: 'New York', status: 'IN_TRANSIT' },
]

const statusMap = {
  PICKED_UP: 'bg-sky-100 text-sky-700',
  IN_TRANSIT: 'bg-orange-100 text-brand-orange',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
}

const timeline = [
  { label: 'Order Received', time: '09:10 AM' },
  { label: 'Driver Assigned', time: '09:32 AM' },
  { label: 'Picked Up', time: '10:05 AM' },
  { label: 'In Transit', time: '11:15 AM' },
  { label: 'Delivered', time: '12:04 PM' },
]

export default function LogisticsHub() {
  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Transport</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">Logistics & Shipments</h1>
          </div>
          <OrangeButton onClick={() => console.log('Triggered Refresh Queue')}>Refresh Queue</OrangeButton>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Active Shipments</p>
            <h2 className="text-xl font-semibold text-brand-charcoal">Shipment Queue</h2>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Pickup City</th>
                  <th className="px-5 py-4">Destination</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipmentQueue.map((shipment) => (
                  <tr key={shipment.id} className="border-t border-slate-200 even:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-brand-charcoal">{shipment.id}</td>
                    <td className="px-5 py-4">{shipment.pickup}</td>
                    <td className="px-5 py-4">{shipment.destination}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusMap[shipment.status]}`}>
                        <Circle className="mr-2 h-3.5 w-3.5" />
                        {shipment.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-brand-charcoal">
            <Truck className="h-5 w-5 text-brand-orange" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Tracking</p>
              <h2 className="text-xl font-semibold">Timeline</h2>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {timeline.map((step) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-50 text-brand-orange">
                    <PackageCheck className="h-5 w-5" />
                  </div>
                </div>
                <div className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-brand-charcoal">{step.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-semibold text-brand-charcoal">Est. Arrival</p>
              <p className="text-sm text-slate-500">Today • 12:30 PM</p>
            </div>
            <OrangeButton onClick={() => console.log('Triggered View Route')} className="px-3 py-2 text-xs">View Route</OrangeButton>
          </div>
        </aside>
      </section>
    </div>
  )
}
