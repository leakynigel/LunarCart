import { useMemo, useState } from 'react'
import { MessageSquare, ChevronDown, ShieldCheck } from 'lucide-react'
import OrangeButton from '../shared/OrangeButton'
import Input from '../shared/Input'

const faqItems = [
  { question: 'How does escrow protection work?', answer: 'All payments are held in secure escrow until both buyer and seller confirm satisfaction.' },
  { question: 'Can I track my order in real time?', answer: 'Yes, every shipment includes an in-app tracking timeline for visibility at every step.' },
  { question: 'What is the refund policy?', answer: 'Refunds are issued through the escrow workflow if items do not match the order details.' },
]

const ticketStatus = [
  { id: 'TCK-212', subject: 'Payment verification', status: 'Open' },
  { id: 'TCK-219', subject: 'Delivery delay', status: 'In progress' },
  { id: 'TCK-227', subject: 'Account access', status: 'Resolved' },
]

export default function SupportCenter() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' })

  const handleToggle = (index) => setActiveIndex(index === activeIndex ? -1 : index)
  const handleSend = () => {
    console.log('Triggered Send Message', messageForm)
  }

  const updateField = (field, value) => setMessageForm((current) => ({ ...current, [field]: value }))

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Support</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">Help & Support</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-brand-orange" />
            24/7 Available
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">FAQ</p>
            <h2 className="text-xl font-semibold text-brand-charcoal">Common Questions</h2>
          </div>

          <div className="mt-6 space-y-4">
            {faqItems.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-3xl border border-slate-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => handleToggle(index)}
                >
                  <span className="font-medium text-brand-charcoal">{item.question}</span>
                  <ChevronDown className={`h-5 w-5 transition ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {activeIndex === index ? (
                  <div className="bg-slate-50 px-5 pb-4 text-sm text-slate-600">{item.answer}</div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</p>
                <h2 className="text-xl font-semibold text-brand-charcoal">Your Tickets</h2>
              </div>
              <MessageSquare className="h-5 w-5 text-brand-orange" />
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Ticket</th>
                    <th className="px-5 py-4">Subject</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketStatus.map((ticket) => (
                    <tr key={ticket.id} className="border-t border-slate-200 even:bg-slate-50">
                      <td className="px-5 py-4 font-medium text-brand-charcoal">{ticket.id}</td>
                      <td className="px-5 py-4">{ticket.subject}</td>
                      <td className="px-5 py-4 text-slate-600">{ticket.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contact</p>
              <h2 className="text-xl font-semibold text-brand-charcoal">Send a Message</h2>
            </div>
            <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); handleSend() }}>
              <Input
                label="Name"
                value={messageForm.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={messageForm.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@example.com"
              />
              <label className="block text-sm text-slate-800">
                <span className="mb-2 block font-medium">Message</span>
                <textarea
                  value={messageForm.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  rows="5"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-orange-200"
                  placeholder="Describe your issue"
                />
              </label>
              <OrangeButton type="submit">Send Message</OrangeButton>
            </form>
          </section>
        </aside>
      </div>
    </div>
  )
}
