// src/components/TaskForm.tsx
import { useState } from 'react'

interface Props {
  onCrear: (titulo: string, descripcion: string) => Promise<void>
}

export function TaskForm({ onCrear }: Props) {
  const [titulo,      setTitulo]      = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [submitting,  setSubmitting]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim()) return
    setSubmitting(true)
    try {
      await onCrear(titulo.trim(), descripcion.trim())
      setTitulo(''); setDescripcion('')
    } catch (err) { console.error(err) }
    finally { setSubmitting(false) }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='¿Qué necesitas hacer?' value={titulo}
        onChange={e => setTitulo(e.target.value)} required />
      <textarea placeholder='Descripción opcional...'
        value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <button type='submit' disabled={submitting || !titulo.trim()} style={{
        background:    submitting || !titulo.trim()
          ? 'var(--card2)'
          : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        border:        'none',
        padding:       '0.6rem 1.5rem',
        fontWeight:    600,
        fontSize:      '0.9rem',
        boxShadow:     submitting ? 'none' : '0 4px 16px rgba(124,58,237,0.3)',
        color:         'white'
      }}>
        {submitting ? 'Guardando...' : '+ Agregar'}
      </button>
    </form>
  )
}