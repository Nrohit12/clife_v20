import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.css'
import App from './App'
import { ThemeProvider } from '@clife/theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider storageKey={"clife_super_admin_theme"} >
      <App />
    </ThemeProvider>
  </StrictMode>,
)
