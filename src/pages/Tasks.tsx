// src/pages/Tasks.tsx
import { useAuth }           from '../hooks/useAuth'
import { useRealtimeTasks }  from '../hooks/useRealtimeTasks'
import { RealtimeIndicator } from '../components/RealtimeIndicator'
import { TaskForm }          from '../components/TaskForm'
import { TaskItem }          from '../components/TaskItem'
import { ChatWidget }        from '../components/Chat/ChatWidget'
import { useNavigate }       from 'react-router-dom'

export function Tasks() {
  const { user, signOut }                                                          = useAuth()
  const { tareas, loading, conectado, crearTarea, actualizarTarea, eliminarTarea } = useRealtimeTasks()
  const navigate                                                                   = useNavigate()

  const handleSignOut = async () => { await signOut(); navigate('/') }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>⟳</div>
        <p style={{ color:'var(--muted)' }}>Cargando tareas...</p>
      </div>
    </div>
  )

  const completadas = tareas.filter(t => t.completada).length
  const porcentaje  = tareas.length > 0
    ? Math.round((completadas / tareas.length) * 100) : 0

  return (
    <div style={{ minHeight:'100vh', padding:'1.5rem 1rem' }}>

      {/* Glow */}
      <div style={{ position:'fixed', top:0, right:0, width:'500px', height:'500px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />

      <div style={{ maxWidth:'780px', margin:'0 auto', position:'relative' }}>

        {/* Nav */}
        <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          marginBottom:'1.75rem', padding:'0.75rem 1.25rem',
          background:'var(--card)', borderRadius:'14px',
          border:'1px solid var(--border)',
          backdropFilter:'blur(10px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'8px',
              background:'linear-gradient(135deg, #7c3aed, #a78bfa)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'0.8rem' }}>✦</div>
            <span style={{ fontWeight:700 }}>TaskApp</span>
          </div>
          <div style={{ display:'flex', gap:'0.6rem', alignItems:'center' }}>
            <RealtimeIndicator conectado={conectado} />
            <span style={{ fontSize:'0.78rem', color:'var(--muted)',
              maxWidth:'140px', overflow:'hidden', textOverflow:'ellipsis',
              whiteSpace:'nowrap' }}>
              {user?.email}
            </span>
            <button onClick={() => navigate('/dashboard')}
              style={{ fontSize:'0.82rem', padding:'0.35rem 0.8rem' }}>
              📊
            </button>
            <button onClick={handleSignOut}
              style={{ fontSize:'0.82rem', padding:'0.35rem 0.8rem',
                color:'var(--danger)', borderColor:'rgba(248,113,113,0.3)' }}>
              Salir
            </button>
          </div>
        </nav>

        {/* Header */}
        <div style={{ marginBottom:'1.5rem' }}>
          <h1 style={{ fontSize:'1.6rem', marginBottom:'0.25rem' }}>
            Mis Tareas
          </h1>
          <p style={{ color:'var(--muted)', fontSize:'0.875rem' }}>
            {completadas} de {tareas.length} completadas · {porcentaje}%
          </p>
          {tareas.length > 0 && (
            <div style={{ marginTop:'0.75rem', background:'#0d0d1a',
              borderRadius:'999px', height:'4px', overflow:'hidden' }}>
              <div style={{ width:`${porcentaje}%`, height:'100%',
                background:'linear-gradient(90deg, #7c3aed, #34d399)',
                borderRadius:'999px', transition:'width 0.5s ease' }} />
            </div>
          )}
        </div>

        {/* Formulario */}
        <div style={{ background:'var(--card)', borderRadius:'16px',
          padding:'1.5rem', marginBottom:'1.5rem',
          border:'1px solid var(--border)',
          boxShadow:'0 4px 24px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontSize:'0.9rem', color:'var(--muted)', fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'1rem' }}>
            Nueva tarea
          </h2>
          <TaskForm onCrear={async (titulo, descripcion) => {
            await crearTarea({ titulo, descripcion })
          }} />
        </div>

        {/* Lista */}
        {tareas.length === 0 ? (
          <div style={{ textAlign:'center', padding:'4rem 2rem',
            color:'var(--muted)', background:'var(--card)',
            borderRadius:'16px', border:'1px solid var(--border)' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem', opacity:0.5 }}>✦</div>
            <p style={{ fontWeight:500 }}>No tienes tareas aún</p>
            <p style={{ fontSize:'0.875rem', marginTop:'0.25rem' }}>
              Crea tu primera tarea arriba
            </p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            {tareas.map(t => (
              <TaskItem key={t.id} tarea={t}
                onActualizar={async (id, completada) => {
                  await actualizarTarea(id, { completada })
                }}
                onEliminar={eliminarTarea}
              />
            ))}
          </div>
        )}
      </div>

      <ChatWidget />
    </div>
  )
}