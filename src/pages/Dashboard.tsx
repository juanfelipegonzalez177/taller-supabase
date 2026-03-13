// src/pages/Dashboard.tsx
import { useNavigate }   from 'react-router-dom'
import { useDashboard }  from '../hooks/useDashboard'
import { StatCard }      from '../components/Dashboard/StatCard'
import { TaskChart }     from '../components/Dashboard/TaskChart'
import { DonutChart }    from '../components/Dashboard/DonutChart'
import { ActivityFeed }  from '../components/Dashboard/ActivityFeed'

const dark = {
  bg:     '#0f0f1a',
  card:   '#1a1a2e',
  border: '#2a2a3e',
  text:   '#e2e8f0',
  muted:  '#64748b',
}

export function Dashboard() {
  const navigate = useNavigate()
  const { stats, activity, distribution, recentFeed,
          loading, lastUpdated, refresh } = useDashboard()

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center',
      alignItems:'center', height:'100vh', background: dark.bg, color: dark.text }}>
      <p>📊 Cargando dashboard...</p>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background: dark.bg,
      color: dark.text, padding:'2rem' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

        {/* ---- Header ---- */}
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', marginBottom:'2rem' }}>
          <div>
            <h1 style={{ margin:0, fontSize:'1.5rem' }}>📊 Dashboard</h1>
            {lastUpdated && (
              <p style={{ margin:0, fontSize:'0.8rem', color: dark.muted }}>
                Actualizado: {lastUpdated.toLocaleTimeString('es-CO')}
                {' '}<span style={{ color:'#10b981' }}>● Realtime activo</span>
              </p>
            )}
          </div>
          <div style={{ display:'flex', gap:'0.75rem' }}>
            <button onClick={() => navigate('/tasks')}
              style={{ padding:'0.5rem 1rem', borderRadius:'8px', cursor:'pointer',
                border:`1px solid ${dark.border}`, background: dark.card,
                color: dark.text }}>
              ← Tareas
            </button>
            <button onClick={refresh}
              style={{ padding:'0.5rem 1rem', borderRadius:'8px', cursor:'pointer',
                border:`1px solid ${dark.border}`, background: dark.card,
                color: dark.text }}>
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* ---- KPIs ---- */}
        {stats && (
          <div style={{ display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',
            gap:'1rem', marginBottom:'2rem' }}>
            <StatCard titulo='Total'       valor={stats.total}
              icono='📋' color='#3b82f6' subtitulo='Todas las tareas' />
            <StatCard titulo='Completadas' valor={stats.completadas}
              icono='✅' color='#10b981' subtitulo={`${stats.porcentaje}%`} />
            <StatCard titulo='Pendientes'  valor={stats.pendientes}
              icono='🔲' color='#f59e0b' subtitulo='Por completar' />
            <StatCard titulo='Progreso'    valor={`${stats.porcentaje}%`}
              icono='📈' color='#8b5cf6' subtitulo='Completitud' />
            <StatCard titulo='Hoy'         valor={stats.creadasHoy}
              icono='📅' color='#0f766e' subtitulo='Nuevas hoy' />
          </div>
        )}

        {/* ---- Barra de progreso ---- */}
        {stats && (
          <div style={{ background: dark.card, borderRadius:'12px',
            padding:'1.5rem', marginBottom:'2rem',
            border:`1px solid ${dark.border}` }}>
            <div style={{ display:'flex', justifyContent:'space-between',
              marginBottom:'0.5rem' }}>
              <span style={{ fontWeight:600 }}>Progreso global</span>
              <span style={{ fontWeight:800, color:'#10b981' }}>
                {stats.porcentaje}%
              </span>
            </div>
            <div style={{ background:'#2a2a3e', borderRadius:'999px',
              height:'12px', overflow:'hidden' }}>
              <div style={{
                width:       `${stats.porcentaje}%`,
                height:      '100%',
                background:  'linear-gradient(90deg, #10b981, #059669)',
                borderRadius:'999px',
                transition:  'width 0.8s ease'
              }} />
            </div>
          </div>
        )}

        {/* ---- Gráficas ---- */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr',
          gap:'1.5rem', marginBottom:'2rem' }}>
          <TaskChart  data={activity} />
          <DonutChart data={distribution} />
        </div>

        {/* ---- Feed ---- */}
        <ActivityFeed tareas={recentFeed} />

      </div>
    </div>
  )
}