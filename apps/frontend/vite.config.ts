import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../../', '')
  
  console.log('Frontend environment variables:')
  console.log('FRONTEND_PORT:', env.FRONTEND_PORT)
  
  return {
    plugins: [vue()],
    server: {
      port: parseInt(env.FRONTEND_PORT),
      host: true
    },
    envDir: '../../'
  }
})
