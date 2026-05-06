import { useMemo } from 'react'
import { BarChart3, ShieldAlert, Users2 } from 'lucide-react'
import OrangeButton from '../shared/OrangeButton'

const ROLES = ['Admin', 'Seller', 'Buyer', 'Transport']

const systemMetrics = [
  { label: 'CPU Load', value: 72 },
  { label: 'Transaction Rate', value: 84 },
  { label: 'Uptime', value: 99 },
]

const userRoles = [
  { name: 'Ari', role: 'Admin' },
  { name: 'Mia', role: 'Seller' },
  { name: 'Zane', role: 'Buyer' },
  { name: 'Sky', role: 'Transport' },
]

export default function SystemControl() {
  const roleOptions = useMemo(() => ROLES, [])
  const handleRoleChange = (user, role) => console.log(`Triggered change role for ${user.name} -> ${role}`)

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Superadmin</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">System Control</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <BarChart3 className="h-4 w-4 text-brand-orange" /> All Systems Operational
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Health Metrics</p>
              <h2 className="text-xl font-semibold text-brand-charcoal">System Status</h2>
            </div>
            <ShieldAlert className="h-5 w-5 text-brand-orange" />
          </div>

          <div className="mt-6 space-y-5">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-brand-charcoal">{metric.label}</span>
                  <span className="text-sm font-semibold text-brand-orange">{metric.value}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-brand-orange" style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Roles</p>
              <h2 className="text-xl font-semibold text-brand-charcoal">User Management</h2>
            </div>
            <Users2 className="h-5 w-5 text-brand-orange" />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Current Role</th>
                  <th className="px-5 py-4">Change To</th>
                </tr>
              </thead>
              <tbody>
                {userRoles.map((user) => (
                  <tr key={user.name} className="border-t border-slate-200 even:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-brand-charcoal">{user.name}</td>
                    <td className="px-5 py-4">{user.role}</td>
                    <td className="px-5 py-4">
                      <select
                        defaultValue={user.role}
                        onChange={(event) => handleRoleChange(user, event.target.value)}
                        className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-orange-200"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <OrangeButton onClick={() => console.log('Triggered Save Role Changes')}>Save Changes</OrangeButton>
          </div>
        </div>
      </section>
    </div>
  )
}
