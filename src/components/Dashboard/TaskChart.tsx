// src/components/Dashboard/TaskChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function TaskChart({ data }: { data: any[] }) {
  if (!data.length) return (
    <div style={{ background:'#1a1a2e', borderRadius:'12px', padding:'1.5rem',
      border:'1px solid #2a2a3e' }}>
      <p style={{ color:'#64748b' }}>Sin actividad aún</p>
    </div>
  )
  return (
    <div style={{ background:'#1a1a2e', borderRadius:'12px', padding:'1.5rem',
      border:'1px solid #2a2a3e' }}>
      <h3 style={{ margin:'0 0 1rem', fontSize:'1rem', color:'#e2e8f0' }}>
        📊 Actividad últimos 7 días
      </h3>
      <ResponsiveContainer width='100%' height={220}>
        <BarChart data={data} margin={{ top:5, right:10, left:-10, bottom:5 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='#2a2a3e' />
          <XAxis dataKey='fecha' tick={{ fontSize:11, fill:'#64748b' }} />
          <YAxis tick={{ fontSize:11, fill:'#64748b' }} allowDecimals={false} />
          <Tooltip contentStyle={{ background:'#1a1a2e', border:'1px solid #2a2a3e',
            borderRadius:'8px', color:'#e2e8f0' }} />
          <Legend wrapperStyle={{ fontSize:'12px', color:'#64748b' }} />
          <Bar dataKey='creadas'     name='Creadas'     fill='#3b82f6' radius={[4,4,0,0]} />
          <Bar dataKey='completadas' name='Completadas' fill='#10b981' radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}