import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.css'
import App from './App'
import { ThemeProvider } from '@clife/theme/ThemeProvider'
import { AuthProvider } from '@/hooks/useAuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider storageKey={"clife_super_admin_theme"} >
      <AuthProvider>

        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
