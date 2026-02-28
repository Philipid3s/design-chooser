import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Replace 'design-chooser' with your actual GitHub repository name
  base: '/design-chooser/',
})
