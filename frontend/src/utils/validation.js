export function validateContact(data) {
  const errors = {}
  if (!data.name?.trim()) errors.name = 'Name is required'
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Invalid email address'
  if (data.phone && !/^[+\d\s\-()]{7,15}$/.test(data.phone))
    errors.phone = 'Invalid phone number'
  return errors
}

export function validateAuth(data, isRegister = false) {
  const errors = {}
  if (isRegister && !data.name?.trim()) errors.name = 'Name is required'
  if (!data.email?.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Invalid email address'
  if (!data.password) errors.password = 'Password is required'
  else if (isRegister && data.password.length < 6)
    errors.password = 'Password must be at least 6 characters'
  return errors
}
