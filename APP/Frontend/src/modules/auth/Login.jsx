import { useState } from "react"
import { login } from "./auth.api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setMessage(null)

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Email and password are required.' })
      setLoading(false)
      return
    }

    const res = await login({ email, password })
    setLoading(false)

    if (res.error) {
      setMessage({ type: 'error', text: res.error })
    } else {
      setMessage({ type: 'success', text: 'Login successful. Token received.' })
      console.log('Login response:', res)
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <label>
        Email
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in…' : 'Login'}
      </button>
      {message && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}
    </div>
  )
}