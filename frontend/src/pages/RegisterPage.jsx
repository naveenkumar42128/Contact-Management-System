import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/authService'
import { validateAuth } from '../utils/validation'
import toast from 'react-hot-toast'
import './Auth.css'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
    const errs = validateAuth(form, true)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const { data } = await register(form)
      setUser(data)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background-text">NAVEEN</div>
      <div className="auth-card card">
        <h1>📇 ContactManager</h1>
        <p className="auth-subtitle">Create your account</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {[
            { name: 'name', placeholder: 'Full Name', type: 'text' },
            { name: 'email', placeholder: 'Email address', type: 'email' },
            { name: 'password', placeholder: 'Password (min 6 chars)', type: 'password' },
          ].map(({ name, placeholder, type }) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
              />
              {errors[name] && <p className="error-text">{errors[name]}</p>}
            </div>
          ))}
          <button type="submit" className="btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
