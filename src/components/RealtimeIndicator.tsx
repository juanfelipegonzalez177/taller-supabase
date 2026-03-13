// src/components/RealtimeIndicator.tsx
export function RealtimeIndicator({ conectado }: { conectado: boolean }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'5px',
      padding:'3px 10px', borderRadius:'999px', fontSize:'0.75rem',
      background: conectado ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
      border:     `1px solid ${conectado ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
      color:      conectado ? 'var(--success)' : 'var(--danger)' }}>
      <span style={{ width:'6px', height:'6px', borderRadius:'50%',
        background: conectado ? 'var(--success)' : 'var(--danger)',
        boxShadow:  conectado ? '0 0 6px var(--success)' : 'none' }} />
      {conectado ? 'Live' : 'Off'}
    </div>
  )
}