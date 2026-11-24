<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() { router.push('/lehrer') }
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <RouterLink class="brand" to="/lehrer">Schulverwaltung</RouterLink>
      <div class="admin-area"><span>Admin</span><button class="logout" type="button" @click="logout">Logout</button></div>
    </header>
    <main class="main"><RouterView /></main>
  </div>
</template>