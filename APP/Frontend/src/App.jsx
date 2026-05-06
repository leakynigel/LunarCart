import { useState } from 'react'
import './App.css'
import Login from './modules/auth/Login'
import Register from './modules/auth/Register'

function App() {
  const [mode, setMode] = useState('login')

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>LunarCart Auth</h1>
        <div className="auth-toggle">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>
      </header>

      <main className="app-content">
        {mode === 'login' ? <Login /> : <Register />}
      </main>
    </div>
  )
}

export default App
