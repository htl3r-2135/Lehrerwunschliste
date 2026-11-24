<script setup>
  defineEmits(['zurueck', 'weiter'])
</script>

<template>
  <footer>
    <button @click="$emit('zurueck')">Zurück</button>
    <button class="primaer" @click="$emit('weiter')">Weiter</button>
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 28px 90px;
  }

  button {
    padding: 11px 22px;
    background: #fffefa;
    border: 1px solid #ede9dd;
    border-radius: 9px;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    border-color: #e2b444;
  }

  .primaer {
    min-width: 135px;
    background: #e2b444;
    border-color: #e2b444;
    font-weight: 750;
  }
</style>
