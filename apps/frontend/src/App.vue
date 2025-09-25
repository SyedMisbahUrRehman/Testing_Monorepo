<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const backendStatus = ref('')
type User = {
  id: string | number
  name: string
  email: string
}

// Use a more explicit ref type so template `v-for` infers correctly
const users = ref<Array<User>>([])
const loading = ref(false)

const fetchBackendData = async () => {
  loading.value = true
  try {
    // Provide a safe fallback and validate the environment variable so the
    // frontend doesn't request `undefined` when the deploy env is misconfigured.
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

    if (!apiBaseUrl) {
      console.error('VITE_API_BASE_URL is not set. Skipping backend requests.')
      backendStatus.value = 'API base URL not configured'
      return
    }

    // Test backend health
    const healthResponse = await fetch(`${apiBaseUrl}/api/health`)
    const healthData = await healthResponse.json()
    backendStatus.value = healthData.message

    // Fetch users
    const usersResponse = await fetch(`${apiBaseUrl}/api/users`)
    const usersData = await usersResponse.json()
    users.value = usersData.data
  } catch (error) {
    console.error('Error fetching data:', error)
    backendStatus.value = 'Backend connection failed'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBackendData()
})
</script>

<template>
  <div class="app">
    <div class="header">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    
    <HelloWorld msg="Vue + NestJS Monorepo" />
    
    <div class="backend-demo">
      <h2>Backend Integration Demo</h2>
      <div class="status">
        <strong>Backend Status:</strong> 
        <span :class="{ 'success': backendStatus.includes('running'), 'error': backendStatus.includes('failed') }">
          {{ backendStatus || 'Checking...' }}
        </span>
      </div>
      
      <div class="users-section">
        <h3>Users from Backend API:</h3>
        <div v-if="loading" class="loading">Loading users...</div>
        <div v-else class="users-list">
          <div v-for="user in users" :key="user.id" class="user-card">
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
