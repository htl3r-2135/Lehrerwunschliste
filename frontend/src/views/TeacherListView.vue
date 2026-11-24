<template>
  <section class="page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">ADMINISTRATION</p>
        <h1>Lehrerübersicht</h1>
        <p class="subheading">
          Alle verfügbaren Lehrer.
        </p>
      </div>

      <RouterLink class="button button-primary" to="/lehrer/neu">
        + Lehrer erstellen
      </RouterLink>
    </div>

    <div class="panel list-panel">
      <div class="list-toolbar">
        <h2>
          Lehrer
          <span class="count">{{ store.teachers.length }}</span>
        </h2>
      </div>

      <div v-if="store.teachers.length" class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Kürzel</th>
              <th>Name</th>
              <th>E-Mail</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="teacher in store.teachers" :key="teacher.id">
              <td>
                <span class="abbreviation">
                  {{ teacher.abbreviation }}
                </span>
              </td>
              <td>
                {{ teacher.firstName }} {{ teacher.lastName }}
              </td>
              <td>{{ teacher.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">+</div>
        <strong>Noch keine Lehrer vorhanden</strong>
        <p>Lege den ersten Lehrer an.</p>

        <RouterLink class="button button-primary" to="/lehrer/neu">
          Lehrer erstellen
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTeacherStore } from '../stores/teacher'

const store = useTeacherStore()
</script>