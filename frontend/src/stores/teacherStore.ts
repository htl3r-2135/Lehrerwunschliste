import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Teacher {
  id: number
  abbreviation: string
  firstName: string
  lastName: string
  email: string
}

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = ref<Teacher[]>([])
  const loading = ref(false)
  const message = ref('')
  const error = ref('')

  async function createTeacher(teacher: Omit<Teacher, 'id'>) {
    loading.value = true
    error.value = ''

    try {
      const res = await fetch('/api/teacher/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
      })

      if (!res.ok) {
        console.error('Status:', res.status)
        error.value = 'Fehler beim Erstellen des Lehrers.'
      }

      const data = await res.json()
      teachers.value.push(data)
      message.value = data.message

    } catch (e) {
      console.error('Error:', e)
      error.value = 'Fehler beim Erstellen des Lehrers.'
    } finally {
      loading.value = false
    }
  }

  return { teachers, loading, error, message, createTeacher }
})
