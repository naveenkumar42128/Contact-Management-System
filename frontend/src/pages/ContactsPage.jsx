import { useEffect, useState, useCallback } from 'react'
import {
  getContacts, createContact, updateContact,
  deleteContact, exportContacts
} from '../services/contactService'
import ContactCard from '../components/ContactCard'
import ContactModal from '../components/ContactModal'
import { useDebounce } from '../hooks/useDebounce'
import { FiPlus, FiSearch, FiDownload } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './ContactsPage.css'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editContact, setEditContact] = useState(null)

  const debouncedSearch = useDebounce(search)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getContacts({ search: debouncedSearch || undefined, page, size: 10 })
      setContacts(data.content)
      setTotalPages(data.totalPages)
    } catch {
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, page])

  useEffect(() => { fetchContacts() }, [fetchContacts])
  useEffect(() => { setPage(0) }, [debouncedSearch])

  const handleSave = async (form) => {
    try {
      if (editContact) {
        await updateContact(editContact.id, form)
        toast.success('Contact updated!')
      } else {
        await createContact(form)
        toast.success('Contact added!')
      }
      setModalOpen(false)
      setEditContact(null)
      fetchContacts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save contact')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return
    try {
      await deleteContact(id)
      toast.success('Contact deleted')
      fetchContacts()
    } catch {
      toast.error('Failed to delete contact')
    }
  }

  const handleEdit = (contact) => {
    setEditContact(contact)
    setModalOpen(true)
  }

  const handleExport = async () => {
    try {
      const { data } = await exportContacts()
      const url = URL.createObjectURL(new Blob([data]))
      const a = document.createElement('a')
      a.href = url
      a.download = 'contacts.csv'
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Contacts exported!')
    } catch {
      toast.error('Export failed')
    }
  }

  return (
    <div className="page-container">
      <div className="contacts-header">
        <h2>My Contacts</h2>
        <div className="contacts-actions">
          <button className="btn-outline icon-btn" onClick={handleExport}>
            <FiDownload /> Export CSV
          </button>
          <button className="btn-primary icon-btn" onClick={() => { setEditContact(null); setModalOpen(true) }}>
            <FiPlus /> Add Contact
          </button>
        </div>
      </div>

      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="empty-state card">
          <p>No contacts found.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)} style={{ marginTop: '0.8rem' }}>
            Add your first contact
          </button>
        </div>
      ) : (
        <div className="contacts-grid">
          {contacts.map(c => (
            <ContactCard key={c.id} contact={c} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn-outline" onClick={() => setPage(p => p - 1)} disabled={page === 0}>
            ← Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button className="btn-outline" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>
            Next →
          </button>
        </div>
      )}

      {modalOpen && (
        <ContactModal
          contact={editContact}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditContact(null) }}
        />
      )}
    </div>
  )
}
