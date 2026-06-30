import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App'
import { WorkoutProvider } from './context/WorkoutContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </StrictMode>,
)