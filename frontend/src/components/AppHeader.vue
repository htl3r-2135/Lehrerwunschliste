<script setup>
  defineProps({
    titel: String
  })
  defineEmits(['logout'])
</script>

<template>
  <header>
    <h2>{{ titel }}</h2>
    <button @click="$emit('logout')">Logout</button>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 88px;
    padding: 20px max(28px, calc((100vw - 1100px) / 2));
    background: #fffefa;
    border-bottom: 1px solid #ede9dd;
  }
  h2 { margin: 0; font-size: 21px; font-weight: 750; }
  button { padding: 11px 22px; background: #fffefa; border: 1px solid #ede9dd; border-radius: 9px; font-weight: 700; cursor: pointer; }
  button:hover { border-color: #e2b444; }
</style>
