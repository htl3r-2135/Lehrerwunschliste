
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

  const API = 'http://localhost:8000/api/teachers'

  async function loadTeachers() {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(API)

      if (!response.ok) {
        throw new Error('Lehrer konnten nicht geladen werden.')
      }

      teachers.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error
        ? err.message
        : 'Ein Fehler ist aufgetreten.'
    }

    loading.value = false
  }

  async function createTeacher(teacher: Omit<Teacher, 'id'>) {
    error.value = ''

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
      })

      if (!response.ok) {
        throw new Error('Lehrer konnte nicht gespeichert werden.')
      }

      const newTeacher: Teacher = await response.json()

      teachers.value.push(newTeacher)

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.'

      throw err
    }
  }

  return { teachers,loading,error,loadTeachers,createTeacher }
})
