import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiMoon, FiSun, FiLogOut, FiUser, FiUsers, FiGrid } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        📇 ContactManager
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}>
          <FiGrid /> Dashboard
        </Link>
        <Link to="/contacts" className={`nav-link ${isActive('/contacts') ? 'nav-link-active' : ''}`}>
          <FiUsers /> Contacts
        </Link>
      </div>

      <div className="navbar-actions">
        <button className="btn-outline icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        {user && (
          <>
            <Link to="/profile" className="navbar-user" title="Profile">
              <div className="navbar-user-avatar">{user.name?.[0]?.toUpperCase()}</div>
              <div className="navbar-user-info">
                <span className="navbar-user-name">{user.name}</span>
                <span className="navbar-user-status">
                  <span className="status-dot"></span> Active
                </span>
              </div>
              <span className="navbar-user-role">{user.role}</span>
            </Link>
            <button className="btn-danger icon-btn" onClick={handleLogout} title="Logout">
              <FiLogOut />
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
