<script setup lang="ts">

function logout() {
  console.log('logout')
}
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <div class="admin-area"><span>Admin</span><button class="logout" type="button" @click="logout">Logout</button></div>
    </header>
    <RouterView />
  </div>
</template>