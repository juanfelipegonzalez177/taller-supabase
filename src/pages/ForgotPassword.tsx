// src/pages/ForgotPassword.tsx
import { useState }          from 'react'
import { Link }              from 'react-router-dom'
import { supabase }          from '../lib/supabaseClient'

export function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)
  const [busy,    setBusy]    = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error al enviar el correo')
    } finally { setBusy(false) }
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'1rem' }}>

      <div style={{ position:'fixed', top:'30%', left:'50%',
        transform:'translate(-50%,-50%)', width:'600px', height:'600px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)' }} />

      <div style={{ width:'100%', maxWidth:'400px' }}>
        <div style={{ background:'var(--card)', borderRadius:'20px',
          padding:'2.5rem', border:'1px solid var(--border)',
          boxShadow:'0 0 40px rgba(251,191,36,0.08)' }}>

          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'16px',
              background:'linear-gradient(135deg, #d97706, #fbbf24)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.5rem', margin:'0 auto 1rem',
              boxShadow:'0 8px 24px rgba(251,191,36,0.3)' }}>
              🔑
            </div>
            <h1 style={{ fontSize:'1.4rem', marginBottom:'0.25rem' }}>
              Recuperar contraseña
            </h1>
            <p style={{ color:'var(--muted)', fontSize:'0.875rem' }}>
              Te enviaremos un enlace para resetearla
            </p>
          </div>

          {success ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📬</div>
              <p style={{ fontWeight:600, marginBottom:'0.5rem' }}>
                ¡Correo enviado!
              </p>
              <p style={{ color:'var(--muted)', fontSize:'0.875rem',
                marginBottom:'1.5rem' }}>
                Revisa tu bandeja de entrada y sigue el enlace para resetear tu contraseña.
              </p>
              <Link to='/' style={{ color:'var(--primary)', fontWeight:600 }}>
                ← Volver al login
              </Link>
            </div>
          ) : (
            <>
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
                  Email
                </label>
                <input type='email' placeholder='tu@email.com' value={email}
                  onChange={e => setEmail(e.target.value)} required />

                <button type='submit' disabled={busy} style={{
                  width:'100%', marginTop:'0.5rem', padding:'0.75rem',
                  fontSize:'0.95rem', fontWeight:600, border:'none',
                  background: busy
                    ? 'var(--card2)'
                    : 'linear-gradient(135deg, #d97706, #fbbf24)',
                  boxShadow: busy ? 'none' : '0 4px 20px rgba(251,191,36,0.3)',
                  borderRadius:'10px', color:'white' }}>
                  {busy ? 'Enviando...' : 'Enviar enlace →'}
                </button>
              </form>

              <p style={{ textAlign:'center', marginTop:'1.5rem',
                color:'var(--muted)', fontSize:'0.875rem' }}>
                <Link to='/' style={{ color:'var(--primary)', fontWeight:600 }}>
                  ← Volver al login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}