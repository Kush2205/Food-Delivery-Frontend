import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import scrollbarHide from 'tailwind-scrollbar-hide'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // scrollbarHide() // Moved to Tailwind CSS configuration
  ]
})