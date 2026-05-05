import { FiEdit2, FiTrash2, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi'
import './ContactCard.css'

export default function ContactCard({ contact, onEdit, onDelete }) {
  const initials = contact.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="contact-card">
      <div className="contact-avatar">{initials}</div>
      <div className="contact-info">
        <h3>{contact.name}</h3>
        {contact.company && <p className="contact-company"><FiBriefcase /> {contact.company}</p>}
        {contact.email && <p><FiMail /> {contact.email}</p>}
        {contact.phone && <p><FiPhone /> {contact.phone}</p>}
      </div>
      <div className="contact-actions">
        <button className="btn-outline icon-btn" onClick={() => onEdit(contact)}>
          <FiEdit2 />
        </button>
        <button className="btn-danger icon-btn" onClick={() => onDelete(contact.id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  )
}
