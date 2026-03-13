// src/components/Chat/ChatWidget.tsx
import { useState, useEffect, useRef } from 'react'
import { useChat }   from '../../hooks/useChat'
import { useAuth }   from '../../hooks/useAuth'

export function ChatWidget() {
  const { user }                    = useAuth()
  const { mensajes, enviarMensaje } = useChat('chat-general')
  const [abierto,  setAbierto]      = useState(false)
  const [texto,    setTexto]        = useState('')
  const bottomRef                   = useRef<HTMLDivElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (abierto) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, abierto])

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!texto.trim()) return
    await enviarMensaje(texto.trim(), user?.email ?? 'Anónimo')
    setTexto('')
  }

  return (
    <div style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:1000 }}>

      {/* ---- Panel de chat ---- */}
      {abierto && (
        <div style={{
          width:        '320px',
          height:       '420px',
          background:   'var(--card)',
          border:       '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow:    '0 8px 32px rgba(0,0,0,0.4)',
          display:      'flex',
          flexDirection:'column',
          marginBottom: '1rem',
          overflow:     'hidden'
        }}>

          {/* Header */}
          <div style={{ padding:'0.875rem 1rem', background:'#16213e',
            borderBottom:'1px solid var(--border)',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%',
                background:'var(--success)' }} />
              <span style={{ fontWeight:600, fontSize:'0.9rem' }}>Chat general</span>
            </div>
            <button onClick={() => setAbierto(false)}
              style={{ background:'none', border:'none', color:'var(--muted)',
                padding:'0', fontSize:'1.1rem', lineHeight:1 }}>
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div style={{ flex:1, overflowY:'auto', padding:'1rem',
            display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {mensajes.length === 0 && (
              <p style={{ color:'var(--muted)', fontSize:'0.85rem',
                textAlign:'center', marginTop:'2rem' }}>
                No hay mensajes aún. ¡Saluda! 👋
              </p>
            )}
            {mensajes.map(m => {
              const esPropio = m.usuario === user?.email
              return (
                <div key={m.id} style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    esPropio ? 'flex-end' : 'flex-start'
                }}>
                  {!esPropio && (
                    <span style={{ fontSize:'0.7rem', color:'var(--muted)',
                      marginBottom:'0.2rem' }}>
                      {m.usuario.split('@')[0]}
                    </span>
                  )}
                  <div style={{
                    maxWidth:     '80%',
                    padding:      '0.5rem 0.75rem',
                    borderRadius: esPropio ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background:   esPropio ? 'var(--primary)' : '#16213e',
                    color:        'var(--text)',
                    fontSize:     '0.875rem',
                    wordBreak:    'break-word'
                  }}>
                    {m.texto}
                  </div>
                  <span style={{ fontSize:'0.65rem', color:'var(--muted)',
                    marginTop:'0.2rem' }}>
                    {m.hora}
                  </span>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleEnviar} style={{
            padding:       '0.75rem',
            borderTop:     '1px solid var(--border)',
            display:       'flex',
            gap:           '0.5rem',
            alignItems:    'center'
          }}>
            <input
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder='Escribe un mensaje...'
              style={{ flex:1, margin:0, padding:'0.5rem 0.75rem',
                fontSize:'0.875rem', borderRadius:'8px' }}
            />
            <button type='submit' disabled={!texto.trim()}
              style={{ background:'var(--primary)', border:'none',
                padding:'0.5rem 0.75rem', borderRadius:'8px',
                fontSize:'1rem', flexShrink:0 }}>
              ➤
            </button>
          </form>
        </div>
      )}

      {/* ---- Botón flotante ---- */}
      <button onClick={() => setAbierto(!abierto)} style={{
        width:        '52px',
        height:       '52px',
        borderRadius: '50%',
        background:   'var(--primary)',
        border:       'none',
        fontSize:     '1.4rem',
        boxShadow:    '0 4px 16px rgba(99,102,241,0.5)',
        display:      'flex',
        alignItems:   'center',
        justifyContent:'center',
        marginLeft:   'auto',
        transition:   'transform 0.2s'
      }}>
        {abierto ? '✕' : '💬'}
      </button>

    </div>
  )
}