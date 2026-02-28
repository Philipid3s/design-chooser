import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DesignChooser from '../design-chooser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DesignChooser />
  </StrictMode>
)
