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
  const error = ref('')

  async function createTeacher(teacher: Omit<Teacher, 'id'>) {
    loading.value = true
    error.value = ''

    try {
      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
      })

      if (!res.ok) {
        throw new Error('Fehler beim Erstellen des Lehrers.')
      }

      const data = await res.json()
      teachers.value.push(data)

    } catch (e) {
      console.error('Error:', e)
      error.value = 'Fehler beim Erstellen des Lehrers.'
    } finally {
      loading.value = false
    }
  }

  return {
    teachers,
    loading,
    error,
    createTeacher
  }
})
