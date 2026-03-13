// src/pages/ResetPassword.tsx
import { useState, useEffect } from 'react'
import { useNavigate }         from 'react-router-dom'
import { supabase }            from '../lib/supabaseClient'

export function ResetPassword() {
  const navigate                    = useNavigate()
  const [password,  setPassword]    = useState('')
  const [password2, setPassword2]   = useState('')
  const [error,     setError]       = useState('')
  const [busy,      setBusy]        = useState(false)
  const [listo,     setListo]       = useState(false)

  useEffect(() => {
    // Supabase maneja el token de la URL automáticamente
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setListo(true)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== password2) {
      setError('Las contraseñas no coinciden'); return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres'); return
    }
    setBusy(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      await supabase.auth.signOut()
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Error al cambiar la contraseña')
    } finally { setBusy(false) }
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'1rem' }}>

      <div style={{ position:'fixed', top:'30%', left:'50%',
        transform:'translate(-50%,-50%)', width:'600px', height:'600px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)' }} />

      <div style={{ width:'100%', maxWidth:'400px' }}>
        <div style={{ background:'var(--card)', borderRadius:'20px',
          padding:'2.5rem', border:'1px solid var(--border)',
          boxShadow:'0 0 40px rgba(124,58,237,0.1)' }}>

          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'16px',
              background:'linear-gradient(135deg, #7c3aed, #a78bfa)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.5rem', margin:'0 auto 1rem',
              boxShadow:'0 8px 24px rgba(124,58,237,0.4)' }}>
              🔒
            </div>
            <h1 style={{ fontSize:'1.4rem', marginBottom:'0.25rem' }}>
              Nueva contraseña
            </h1>
            <p style={{ color:'var(--muted)', fontSize:'0.875rem' }}>
              Elige una contraseña segura
            </p>
          </div>

          {error && (
            <div style={{ background:'rgba(248,113,113,0.08)',
              border:'1px solid rgba(248,113,113,0.2)', borderRadius:'10px',
              padding:'0.75rem 1rem', marginBottom:'1.25rem',
              color:'var(--danger)', fontSize:'0.875rem' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ fontSize:'0.8rem', color:'var(--muted)', fontWeight:500,
              letterSpacing:'0.05em', textTransform:'uppercase',
              display:'block', marginBottom:'0.35rem' }}>
              Nueva contraseña
            </label>
            <input type='password' placeholder='••••••••' value={password}
              onChange={e => setPassword(e.target.value)} required />

            <label style={{ fontSize:'0.8rem', color:'var(--muted)', fontWeight:500,
              letterSpacing:'0.05em', textTransform:'uppercase',
              display:'block', marginBottom:'0.35rem' }}>
              Confirmar contraseña
            </label>
            <input type='password' placeholder='••••••••' value={password2}
              onChange={e => setPassword2(e.target.value)} required />

            {/* Indicador de seguridad */}
            {password && (
              <div style={{ marginBottom:'1rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between',
                  marginBottom:'0.35rem' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--muted)' }}>
                    Seguridad
                  </span>
                  <span style={{ fontSize:'0.75rem', color:
                    password.length < 6 ? 'var(--danger)' :
                    password.length < 10 ? 'var(--warning)' : 'var(--success)' }}>
                    {password.length < 6 ? 'Débil' :
                     password.length < 10 ? 'Media' : 'Fuerte'}
                  </span>
                </div>
                <div style={{ background:'#0d0d1a', borderRadius:'999px',
                  height:'4px', overflow:'hidden' }}>
                  <div style={{
                    width: password.length < 6 ? '25%' :
                           password.length < 10 ? '60%' : '100%',
                    height:'100%', borderRadius:'999px', transition:'all 0.3s',
                    background: password.length < 6 ? 'var(--danger)' :
                                password.length < 10 ? 'var(--warning)' : 'var(--success)'
                  }} />
                </div>
              </div>
            )}

            <button type='submit' disabled={busy || !listo} style={{
              width:'100%', marginTop:'0.5rem', padding:'0.75rem',
              fontSize:'0.95rem', fontWeight:600, border:'none',
              background: busy
                ? 'var(--card2)'
                : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              boxShadow: busy ? 'none' : '0 4px 20px rgba(124,58,237,0.4)',
              borderRadius:'10px', color:'white' }}>
              {busy ? 'Guardando...' : 'Cambiar contraseña →'}
            </button>

            {!listo && (
              <p style={{ textAlign:'center', marginTop:'0.75rem',
                color:'var(--muted)', fontSize:'0.8rem' }}>
                Esperando verificación del enlace...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}