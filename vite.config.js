import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const prepareAdditionalData = () => {
  const mixins = '@import "@/assets/styles/_breakpoints.scss";'
  const variables = '@import "@/assets/styles/_variables.scss";'
  const functions = '@import "@/assets/styles/_functions.scss";'

  return `${variables} ${mixins} ${functions}`
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: prepareAdditionalData()
      }
    }
  },
  server: {
    port: 8080
  }
})
