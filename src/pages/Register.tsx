// src/pages/Register.tsx
import { useState }          from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth }           from '../hooks/useAuth'

export function Register() {
  const { signUp, user, loading } = useAuth()
  const navigate                  = useNavigate()
  const [email,    setEmail]      = useState('')
  const [password, setPassword]   = useState('')
  const [error,    setError]      = useState('')
  const [busy,     setBusy]       = useState(false)

  if (!loading && user) { navigate('/tasks', { replace: true }); return null }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try { await signUp(email, password); navigate('/tasks') }
    catch (err: any) { setError(err.message || 'Error al registrarse') }
    finally { setBusy(false) }
  }

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'1rem' }}>

      <div style={{ position:'fixed', top:'30%', left:'50%', transform:'translate(-50%,-50%)',
        width:'600px', height:'600px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)',
        pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:'400px' }}>
        <div style={{ background:'var(--card)', borderRadius:'20px',
          padding:'2.5rem', border:'1px solid var(--border)',
          boxShadow:'0 0 40px rgba(52,211,153,0.08), 0 0 0 1px rgba(255,255,255,0.03)' }}>

          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'16px',
              background:'linear-gradient(135deg, #059669, #34d399)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.5rem', margin:'0 auto 1rem',
              boxShadow:'0 8px 24px rgba(52,211,153,0.3)' }}>
              ✦
            </div>
            <h1 style={{ fontSize:'1.5rem', marginBottom:'0.25rem' }}>Crear cuenta</h1>
            <p style={{ color:'var(--muted)', fontSize:'0.875rem' }}>
              Empieza a organizar tus tareas
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
              Email
            </label>
            <input type='email' placeholder='tu@email.com' value={email}
              onChange={e => setEmail(e.target.value)} required />

            <label style={{ fontSize:'0.8rem', color:'var(--muted)', fontWeight:500,
              letterSpacing:'0.05em', textTransform:'uppercase',
              display:'block', marginBottom:'0.35rem' }}>
              Contraseña
            </label>
            <input type='password' placeholder='••••••••' value={password}
              onChange={e => setPassword(e.target.value)} required />

            <button type='submit' disabled={busy} style={{
              width:'100%', marginTop:'0.5rem', padding:'0.75rem',
              fontSize:'0.95rem', fontWeight:600, border:'none',
              background: busy
                ? 'var(--card2)'
                : 'linear-gradient(135deg, #059669, #34d399)',
              boxShadow: busy ? 'none' : '0 4px 20px rgba(52,211,153,0.3)',
              borderRadius:'10px', color:'white' }}>
              {busy ? 'Registrando...' : 'Crear cuenta →'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.5rem',
            color:'var(--muted)', fontSize:'0.875rem' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to='/' style={{ color:'var(--primary)', fontWeight:600 }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}