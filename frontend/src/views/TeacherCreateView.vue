<script setup lang="ts">
import { ref } from 'vue'
import { useTeacherStore } from '@/stores/teacherStore';

const teacherStore = useTeacherStore()
const abbreviation = ref('')
const email = ref('')
const firstName = ref('')
const lastName = ref('')

function submit() {
  const teacher = {
    abbreviation: abbreviation.value,
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value
  }

  teacherStore.createTeacher(teacher);
}
</script>
<template>
  <section class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">ADMINISTRATION</p>
        <h1>Lehrer erstellen</h1>
        <p class="subheading">Neuen Lehrer hinzufügen.</p>
      </div>

      <button>
        Zur Übersicht
      </button>
    </div>

    <form class="panel form-panel" @submit.prevent="submit">
      <h2>Lehrerdaten</h2>

      <div class="form-grid">
        <label class="field">
          <span>Lehrerkürzel</span>
          <input v-model="abbreviation" required />
        </label>

        <label class="field">
          <span>E-Mail</span>
          <input v-model="email" type="email" required />
        </label>

        <label class="field">
          <span>Vorname</span>
          <input v-model="firstName" required />
        </label>

        <label class="field">
          <span>Nachname</span>
          <input v-model="lastName" required />
        </label>
      </div>

      <p v-if="teacherStore.error" class="error">
        {{ teacherStore.error }}
      </p>
      <p v-if="teacherStore.message" class="success">
        {{ teacherStore.message }}
      </p>

      <div class="form-actions">
        <button>
          Abbrechen
        </button>
        <button class="button button-primary" type="submit">
          Speichern
        </button>
      </div>
    </form>
  </section>
</template>