import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getContacts } from '../services/contactService'
import { FiUsers, FiUserPlus, FiArrowRight, FiPhone, FiMail, FiStar, FiTrendingUp } from 'react-icons/fi'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ total: 0, recent: [] })

  useEffect(() => {
    getContacts({ page: 0, size: 5 }).then(({ data }) => {
      setStats({ total: data.totalElements, recent: data.content })
    })
  }, [])

  return (
    <div className="dashboard-wrapper">

      {/* Company Hero Banner */}
      <div className="company-banner">
        <div className="banner-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="banner-content">
          <div className="company-logo">📇</div>
          <div className="banner-text">
            <h1>ContactManager <span className="banner-pro">Pro</span></h1>
            <p>Your all-in-one solution for managing professional relationships</p>
            <div className="banner-badges">
              <span className="badge">✅ Secure</span>
              <span className="badge">⚡ Fast</span>
              <span className="badge">☁️ Cloud Sync</span>
              <span className="badge">📊 Analytics</span>
            </div>
          </div>
          <div className="banner-actions">
            <Link to="/contacts" className="banner-btn-primary">
              Manage Contacts <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className="banner-stats">
          <div className="banner-stat">
            <span className="banner-stat-number">{stats.total}</span>
            <span className="banner-stat-label">Total Contacts</span>
          </div>
          <div className="banner-stat-divider"></div>
          <div className="banner-stat">
            <span className="banner-stat-number">100%</span>
            <span className="banner-stat-label">Data Security</span>
          </div>
          <div className="banner-stat-divider"></div>
          <div className="banner-stat">
            <span className="banner-stat-number">24/7</span>
            <span className="banner-stat-label">Availability</span>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Welcome Row */}
        <div className="dashboard-header">
          <div>
            <h2>Welcome back, {user?.name} 👋</h2>
            <p className="text-muted">Here's what's happening with your contacts today.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon" style={{ background: '#ede9fe' }}>
              <FiUsers size={22} color="#7c3aed" />
            </div>
            <div>
              <p className="stat-number">{stats.total}</p>
              <p className="stat-label">Total Contacts</p>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon" style={{ background: '#d1fae5' }}>
              <FiUserPlus size={22} color="#059669" />
            </div>
            <div>
              <p className="stat-number">{stats.recent.length}</p>
              <p className="stat-label">Recent Added</p>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon" style={{ background: '#fef3c7' }}>
              <FiTrendingUp size={22} color="#d97706" />
            </div>
            <div>
              <p className="stat-number">Active</p>
              <p className="stat-label">Account Status</p>
            </div>
          </div>
          <div className="stat-card card">
            <div className="stat-icon" style={{ background: '#fee2e2' }}>
              <FiStar size={22} color="#dc2626" />
            </div>
            <div>
              <p className="stat-number">{user?.role}</p>
              <p className="stat-label">Your Role</p>
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Recent Contacts</h3>
            <Link to="/contacts" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>View all →</Link>
          </div>
          {stats.recent.length === 0 ? (
            <div className="empty-banner">
              <p>📭 No contacts yet.</p>
              <Link to="/contacts" className="banner-btn-primary" style={{ marginTop: '0.8rem', display: 'inline-flex' }}>
                Add your first contact <FiArrowRight />
              </Link>
            </div>
          ) : (
            <ul className="recent-list">
              {stats.recent.map(c => (
                <li key={c.id} className="recent-item">
                  <div className="recent-avatar">{c.name[0].toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <p className="recent-name">{c.name}</p>
                    <p className="recent-email">{c.company || 'No company'}</p>
                  </div>
                  <div className="recent-contact-info">
                    {c.email && <span><FiMail size={12} /> {c.email}</span>}
                    {c.phone && <span><FiPhone size={12} /> {c.phone}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Company Features Section */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h4>Secure Storage</h4>
            <p>All your contacts are encrypted and stored securely with JWT authentication.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h4>Smart Search</h4>
            <p>Find any contact instantly by name, email, company or phone number.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <h4>CSV Export</h4>
            <p>Export all your contacts to CSV format with a single click anytime.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h4>Dark Mode</h4>
            <p>Easy on the eyes with a beautiful dark mode toggle available anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
