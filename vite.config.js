import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rekindle-website/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/_variables.scss";
          @import "./src/styles/_mixins.scss";
          @import "./src/styles/_animations.scss";
          @import "./src/styles/_typography.scss";
        `
      }
    }
  }
})
