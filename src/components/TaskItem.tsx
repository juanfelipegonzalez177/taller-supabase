// src/components/TaskItem.tsx
import { useState }   from 'react'
import type { Tarea } from '../types/database'

interface Props {
  tarea:        Tarea
  onActualizar: (id: string, completada: boolean) => Promise<void>
  onEliminar:   (id: string) => Promise<void>
}

export function TaskItem({ tarea, onActualizar, onEliminar }: Props) {
  const [eliminando, setEliminando] = useState(false)

  const handleEliminar = async () => {
    if (!confirm('¿Eliminar esta tarea?')) return
    setEliminando(true)
    await onEliminar(tarea.id)
  }

  return (
    <div style={{
      display:      'flex',
      gap:          '1rem',
      alignItems:   'center',
      padding:      '1rem 1.25rem',
      background:   'var(--card)',
      borderRadius: '12px',
      border:       '1px solid var(--border)',
      borderLeft:   `3px solid ${tarea.completada ? 'var(--success)' : 'var(--primary)'}`,
      opacity:      eliminando ? 0.4 : 1,
      transition:   'all 0.2s',
      boxShadow:    tarea.completada ? 'none' : '0 2px 12px rgba(124,58,237,0.05)'
    }}>
      <input type='checkbox' checked={tarea.completada ?? false}
        onChange={() => onActualizar(tarea.id, !tarea.completada)}
        style={{ width:'17px', height:'17px', cursor:'pointer',
          accentColor:'var(--success)', flexShrink:0 }}
      />
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ margin:0, fontWeight:500, fontSize:'0.95rem',
          textDecoration: tarea.completada ? 'line-through' : 'none',
          color:          tarea.completada ? 'var(--muted)' : 'var(--text)',
          whiteSpace:     'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }}>{tarea.titulo}</p>
        {tarea.descripcion && (
          <p style={{ margin:'0.2rem 0 0', color:'var(--muted)', fontSize:'0.82rem' }}>
            {tarea.descripcion}
          </p>
        )}
      </div>
      <button onClick={handleEliminar} disabled={eliminando}
        style={{ background:'none', border:'none', padding:'0.25rem',
          color:'var(--muted)', fontSize:'0.9rem', cursor:'pointer',
          flexShrink:0, transition:'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
        🗑
      </button>
    </div>
  )
}