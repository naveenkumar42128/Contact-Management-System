import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiShield, FiCalendar, FiActivity } from 'react-icons/fi'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user } = useAuth()
  const joinDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="page-container">
      <div className="profile-wrapper">

        {/* Profile Header Card */}
        <div className="profile-header-card card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="profile-status-badge">
              <span className="status-dot"></span> Active
            </div>
          </div>
          <div className="profile-header-info">
            <h2>{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-badges">
              <span className="profile-role-badge">{user?.role}</span>
              <span className="profile-active-badge">
                <span className="status-dot"></span> Online Now
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="profile-grid">

          <div className="profile-info-card card">
            <h3>Account Information</h3>
            <div className="profile-details">
              <div className="profile-detail-item">
                <div className="detail-icon"><FiUser /></div>
                <div>
                  <p className="detail-label">Full Name</p>
                  <p className="detail-value">{user?.name}</p>
                </div>
              </div>
              <div className="profile-detail-item">
                <div className="detail-icon"><FiMail /></div>
                <div>
                  <p className="detail-label">Email Address</p>
                  <p className="detail-value">{user?.email}</p>
                </div>
              </div>
              <div className="profile-detail-item">
                <div className="detail-icon"><FiShield /></div>
                <div>
                  <p className="detail-label">Role</p>
                  <p className="detail-value">{user?.role}</p>
                </div>
              </div>
              <div className="profile-detail-item">
                <div className="detail-icon"><FiCalendar /></div>
                <div>
                  <p className="detail-label">Member Since</p>
                  <p className="detail-value">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-status-card card">
            <h3>Account Status</h3>
            <div className="status-list">
              <div className="status-item">
                <div className="status-item-left">
                  <FiActivity color="#10b981" />
                  <span>Account Status</span>
                </div>
                <span className="status-pill active">Active</span>
              </div>
              <div className="status-item">
                <div className="status-item-left">
                  <FiShield color="#4f46e5" />
                  <span>Role</span>
                </div>
                <span className="status-pill role">{user?.role}</span>
              </div>
              <div className="status-item">
                <div className="status-item-left">
                  <FiUser color="#f59e0b" />
                  <span>Session</span>
                </div>
                <span className="status-pill online">Online</span>
              </div>
              <div className="status-item">
                <div className="status-item-left">
                  <FiMail color="#6366f1" />
                  <span>Email Verified</span>
                </div>
                <span className="status-pill active">✓ Verified</span>
              </div>
            </div>

            <div className="profile-user-card">
              <div className="puc-avatar">{user?.name?.[0]?.toUpperCase()}</div>
              <div className="puc-info">
                <p className="puc-name">{user?.name}</p>
                <p className="puc-email">{user?.email}</p>
                <div className="puc-status">
                  <span className="status-dot"></span>
                  <span>Currently Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
