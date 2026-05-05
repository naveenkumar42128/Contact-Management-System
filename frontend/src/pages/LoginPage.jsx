import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/authService'
import { validateAuth } from '../utils/validation'
import toast from 'react-hot-toast'
import './Auth.css'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login: setUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateAuth(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const { data } = await login(form)
      setUser(data)
      toast.success(`Welcome back, ${data.name}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background-text">NAVEEN</div>
      <div className="auth-card card">
        <h1>📇 ContactManager</h1>
        <p className="auth-subtitle">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
