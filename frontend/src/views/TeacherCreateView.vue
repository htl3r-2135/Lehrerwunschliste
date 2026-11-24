<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTeacherStore } from '../stores/teacher'

const store = useTeacherStore()
const router = useRouter()
const formError = ref('')
const form = reactive({ abbreviation: '', firstName: '', lastName: '', email: '' })

async function submit() {
  formError.value = ''
  if (!form.abbreviation || !form.firstName || !form.lastName || !form.email) {
    formError.value = 'Bitte fülle alle Pflichtfelder aus.'
    return
  }
  try {
    await store.createTeacher({
      abbreviation: form.abbreviation.toUpperCase(),
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    })
    await router.push('/lehrer')
  } catch {
  }
}
</script>

<template>
  <section class="page">
    <div class="page-heading">
      <div><p class="eyebrow">ADMINISTRATION</p><h1>Lehrer erstellen</h1><p class="subheading">Neuen Lehrer zur Anwendung hinzufügen.</p></div>
      <RouterLink class="button button-quiet" to="/lehrer">Zur Übersicht</RouterLink>
    </div>

    <form class="panel form-panel" @submit.prevent="submit">
      <h2>Lehrerdaten</h2>
      <div class="form-grid">
        <label class="field">
          <span>Lehrerkürzel</span>
          <input v-model.trim="form.abbreviation" maxlength="12" required placeholder="z. B. MUS" autocomplete="off" />
          <small>Ein eindeutiges Kürzel, maximal 12 Zeichen.</small>
        </label>
        <label class="field">
          <span>E-Mail</span>
          <input v-model.trim="form.email" type="email" maxlength="180" required placeholder="name@schule.at" autocomplete="email" />
        </label>
        <label class="field">
          <span>Vorname</span>
          <input v-model.trim="form.firstName" maxlength="100" required placeholder="Max" autocomplete="given-name" />
        </label>
        <label class="field">
          <span>Nachname</span>
          <input v-model.trim="form.lastName" maxlength="100" required placeholder="Mustermann" autocomplete="family-name" />
        </label>
      </div>
      <p class="hint">→ Der Lehrer erhält eine E-Mail mit einem OTP zur Anmeldung.</p>
      <p v-if="formError || store.error" class="error" role="alert">{{ formError || store.error }}</p>
      <div class="form-actions">
        <RouterLink class="button button-quiet" to="/lehrer">Abbrechen</RouterLink>
        <button class="button button-primary" type="submit" :disabled="store.saving">
          {{ store.saving ? 'Wird gespeichert …' : 'Speichern' }}
        </button>
      </div>
    </form>
  </section>
</template>
