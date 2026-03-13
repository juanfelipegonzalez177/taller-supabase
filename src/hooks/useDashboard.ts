import { useState, useEffect, useCallback } from 'react'
import { supabase }          from '../lib/supabaseClient'
import { dashboardService }  from '../services/dashboardService'
import type { Tarea }        from '../types/database'

export function useDashboard() {
  const [stats,        setStats]        = useState<any>(null)
  const [activity,     setActivity]     = useState<any[]>([])
  const [distribution, setDistribution] = useState<any[]>([])
  const [recentFeed,   setRecentFeed]   = useState<Tarea[]>([])
  const [loading,      setLoading]      = useState(true)
  const [lastUpdated,  setLastUpdated]  = useState<Date | null>(null)

  const refresh = useCallback(async () => {
    try {
      const [s, a, d, f] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getActivityByDay(),
        dashboardService.getDistribution(),
        dashboardService.getRecentActivity(10),
      ])
      setStats(s)
      setActivity(a)
      setDistribution(d)
      setRecentFeed(f)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()

    // Recalcula métricas en tiempo real cuando cambia la tabla Tareas
    const ch = supabase
      .channel('dashboard-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Tareas' },
        () => refresh()
      )
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [refresh])

  return { stats, activity, distribution, recentFeed, loading, lastUpdated, refresh }
}