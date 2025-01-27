import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    tailwindcss(),
    // scrollbarHide() // Moved to Tailwind CSS configuration
  ]
})