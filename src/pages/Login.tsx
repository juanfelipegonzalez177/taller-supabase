// src/pages/Login.tsx
import { useState }          from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth }           from '../hooks/useAuth'

export function Login() {
  const { signIn, user, loading } = useAuth()
  const navigate                  = useNavigate()
  const [email,    setEmail]      = useState('')
  const [password, setPassword]   = useState('')
  const [error,    setError]      = useState('')
  const [busy,     setBusy]       = useState(false)

  if (!loading && user) { navigate('/tasks', { replace: true }); return null }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try { await signIn(email, password); navigate('/tasks') }
    catch (err: any) { setError(err.message || 'Credenciales incorrectas') }
    finally { setBusy(false) }
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'1rem' }}>

      {/* Glow de fondo */}
      <div style={{ position:'fixed', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
        width:'600px', height:'600px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:'400px', position:'relative' }}>

        {/* Card */}
        <div style={{ background:'var(--card)', borderRadius:'20px',
          padding:'2.5rem', border:'1px solid var(--border)',
          boxShadow:'0 0 40px rgba(124,58,237,0.1), 0 0 0 1px rgba(255,255,255,0.03)' }}>

          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'16px',
              background:'linear-gradient(135deg, #7c3aed, #a78bfa)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.5rem', margin:'0 auto 1rem',
              boxShadow:'0 8px 24px rgba(124,58,237,0.4)' }}>
              ✦
            </div>
            <h1 style={{ fontSize:'1.5rem', marginBottom:'0.25rem' }}>Bienvenido</h1>
            <p style={{ color:'var(--muted)', fontSize:'0.875rem' }}>
              Inicia sesión en tu cuenta
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
            <label style={{ fontSize:'0.8rem', color:'var(--muted)',
              fontWeight:500, letterSpacing:'0.05em',
              textTransform:'uppercase', display:'block', marginBottom:'0.35rem' }}>
              Email
            </label>
            <input type='email' placeholder='tu@email.com' value={email}
              onChange={e => setEmail(e.target.value)} required />

            <label style={{ fontSize:'0.8rem', color:'var(--muted)',
              fontWeight:500, letterSpacing:'0.05em',
              textTransform:'uppercase', display:'block', marginBottom:'0.35rem' }}>
              Contraseña
            </label>
            <input type='password' placeholder='••••••••' value={password}
              onChange={e => setPassword(e.target.value)} required />

            <button type='submit' disabled={busy} style={{
              width:'100%', marginTop:'0.5rem', padding:'0.75rem',
              fontSize:'0.95rem', fontWeight:600, border:'none',
              background: busy
                ? 'var(--card2)'
                : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              boxShadow: busy ? 'none' : '0 4px 20px rgba(124,58,237,0.4)',
              borderRadius:'10px', color:'white' }}>
              {busy ? 'Entrando...' : 'Iniciar sesión →'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.5rem',
            color:'var(--muted)', fontSize:'0.875rem' }}>
            ¿No tienes cuenta?{' '}
            <Link to='/register' style={{ color:'var(--primary)', fontWeight:600 }}>
              Regístrate
            </Link>
          </p>
          <p style={{ textAlign:'center', marginTop:'0.75rem',
  fontSize:'0.85rem' }}>
  <Link to='/forgot-password' style={{ color:'var(--muted)' }}>
    ¿Olvidaste tu contraseña?
  </Link>
</p>

        </div>
      </div>
    </div>
  )
}