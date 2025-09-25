import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../', '')
  
  // Avoid using `console` in this config to prevent TypeScript errors in node build
  // (If you need logging during dev, enable it conditionally or use a logger.)
  
  return {
    plugins: [vue()],
    server: {
      port: parseInt(env.FRONTEND_PORT),
      host: true
    },
    envDir: '../../'
  }
})
