// src/components/Dashboard/DonutChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function DonutChart({ data }: { data: any[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div style={{ background:'#1a1a2e', borderRadius:'12px', padding:'1.5rem',
      border:'1px solid #2a2a3e' }}>
      <h3 style={{ margin:'0 0 1rem', fontSize:'1rem', color:'#e2e8f0' }}>
        🍩 Distribución
      </h3>
      {total === 0
        ? <p style={{ color:'#64748b' }}>Sin tareas</p>
        : <ResponsiveContainer width='100%' height={200}>
            <PieChart>
              <Pie data={data} cx='50%' cy='50%'
                innerRadius={50} outerRadius={80}
                paddingAngle={3} dataKey='value'>
                {data.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#1a1a2e', border:'1px solid #2a2a3e',
                borderRadius:'8px', color:'#e2e8f0' }}
                formatter={(v) => [`${v} tareas`]} />
              <Legend wrapperStyle={{ fontSize:'12px', color:'#64748b' }} />
            </PieChart>
          </ResponsiveContainer>
      }
    </div>
  )
}