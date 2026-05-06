import { useState } from "react"
import { register } from "./auth.api"

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "buyer",
  })
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setMessage(null)

    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      setMessage({ type: 'error', text: 'First name, last name, email, and password are required.' })
      setLoading(false)
      return
    }

    const res = await register(form)
    setLoading(false)

    if (res.error) {
      setMessage({ type: 'error', text: res.error })
    } else {
      setMessage({ type: 'success', text: 'Registration successful. You can log in now.' })
      console.log('Register response:', res)
    }
  }

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <label>
        First Name
        <input
          value={form.first_name}
          placeholder="First name"
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
      </label>
      <label>
        Last Name
        <input
          value={form.last_name}
          placeholder="Last name"
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </label>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Registering…' : 'Register'}
      </button>
      {message && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
}