import { useState, useEffect } from 'react'
import { validateContact } from '../utils/validation'
import './Modal.css'

const EMPTY = { name: '', email: '', phone: '', address: '', company: '', notes: '' }

export default function ContactModal({ contact, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(contact ? { ...contact } : EMPTY)
    setErrors({})
  }, [contact])

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(err => ({ ...err, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateContact(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box card" onClick={e => e.stopPropagation()}>
        <h2>{contact ? 'Edit Contact' : 'Add Contact'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {[
            { name: 'name', placeholder: 'Full Name *' },
            { name: 'email', placeholder: 'Email', type: 'email' },
            { name: 'phone', placeholder: 'Phone' },
            { name: 'company', placeholder: 'Company' },
            { name: 'address', placeholder: 'Address' },
          ].map(({ name, placeholder, type = 'text' }) => (
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
          <textarea
            name="notes"
            placeholder="Notes"
            rows={3}
            value={form.notes}
            onChange={handleChange}
          />
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
