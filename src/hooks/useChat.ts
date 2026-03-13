// src/hooks/useChat.ts
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Mensaje { id: string; texto: string; usuario: string; hora: string }

export function useChat(sala: string) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const channelRef              = useRef<any>(null)

  useEffect(() => {
    const channel = supabase
      .channel(sala)
      .on('broadcast', { event: 'mensaje' }, ({ payload }) => {
        setMensajes(prev => [...prev, payload as Mensaje])
      })
      .subscribe()

    channelRef.current = channel

    return () => { supabase.removeChannel(channel) }
  }, [sala])

  const enviarMensaje = async (texto: string, usuario: string) => {
    if (!channelRef.current) return

    const mensaje: Mensaje = {
      id:      crypto.randomUUID(),
      texto,
      usuario,
      hora:    new Date().toLocaleTimeString()
    }

    // Agregar localmente de inmediato
    setMensajes(prev => [...prev, mensaje])

    // Enviar a los demás
    await channelRef.current.send({
      type:    'broadcast',
      event:   'mensaje',
      payload: mensaje
    })
  }

  return { mensajes, enviarMensaje }
}