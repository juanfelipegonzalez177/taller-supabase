import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth }          from './hooks/useAuth'
import { Login }            from './pages/Login'
import { Register }         from './pages/Register'
import { Tasks }            from './pages/Tasks'
import { Dashboard }        from './pages/Dashboard'
import { ForgotPassword }   from './pages/ForgotPassword'
import { ResetPassword }    from './pages/ResetPassword'

function App() {
  const { user, loading } = useAuth()

  if (loading) return <div>Cargando...</div>

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path='/'               element={<Login />} />
            <Route path='/register'       element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password'  element={<ResetPassword />} />
            <Route path='*'               element={<Navigate to='/' replace />} />
          </>
        ) : (
          <>
            <Route path='/tasks'           element={<Tasks />} />
            <Route path='/dashboard'       element={<Dashboard />} />
            <Route path='/reset-password'  element={<ResetPassword />} />
            <Route path='*'               element={<Navigate to='/tasks' replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App