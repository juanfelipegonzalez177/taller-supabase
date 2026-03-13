// src/services/dashboardService.ts
import { taskService } from './taskService'
import type { Tarea }  from '../types/database'

export const dashboardService = {

  // ---- KPIs globales ----------------------------------------
  getStats: async () => {
    const { data, error } = await taskService.getAll()
    if (error) throw error

    const tareas      = (data ?? []) as Tarea[]
    const total       = tareas.length
    const completadas = tareas.filter(t => t.completada === true).length
    const pendientes  = total - completadas
    const porcentaje  = total > 0 ? Math.round((completadas / total) * 100) : 0
    const hoy         = new Date().toISOString().split('T')[0]
    const creadasHoy  = tareas.filter(t => t.created_at?.startsWith(hoy) ?? false).length

    return { total, completadas, pendientes, porcentaje, creadasHoy }
  },

  // ---- Actividad por día - últimos 7 días -------------------
  getActivityByDay: async () => {
    const { data, error } = await taskService.getAll()
    if (error) throw error

    const tareas = (data ?? []) as Tarea[]
    const hace7  = new Date()
    hace7.setDate(hace7.getDate() - 7)

    const recientes = tareas.filter(t =>
      t.created_at != null && new Date(t.created_at) >= hace7
    )

    const grouped: Record<string, { creadas: number; completadas: number }> = {}
    recientes.forEach(t => {
      if (!t.created_at) return
      const d = t.created_at.split('T')[0]
      if (!grouped[d]) grouped[d] = { creadas: 0, completadas: 0 }
      grouped[d].creadas++
      if (t.completada === true) grouped[d].completadas++
    })

    return Object.entries(grouped).map(([fecha, v]) => ({
      fecha: new Date(fecha).toLocaleDateString('es-CO',
        { weekday: 'short', day: 'numeric' }),
      ...v
    }))
  },

  // ---- Distribución para gráfica de dona --------------------
  getDistribution: async () => {
    const { data, error } = await taskService.getAll()
    if (error) throw error

    const tareas      = (data ?? []) as Tarea[]
    const completadas = tareas.filter(t => t.completada === true).length
    const pendientes  = tareas.length - completadas

    return [
      { name: 'Completadas', value: completadas, color: '#10b981' },
      { name: 'Pendientes',  value: pendientes,  color: '#f59e0b' },
    ]
  },

  // ---- Actividad reciente -----------------------------------
  getRecentActivity: (limit = 10) =>
    taskService.getAll().then(({ data, error }) => {
      if (error) throw error
      return (data ?? []).slice(0, limit) as Tarea[]
    }),
}