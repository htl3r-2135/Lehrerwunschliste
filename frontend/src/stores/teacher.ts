
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
  const error = ref('')

  function createTeacher(teacher: Omit<Teacher, 'id'>) {
    error.value = ''

    if (teachers.value.some(t => t.abbreviation === teacher.abbreviation)) {
      error.value = 'Dieses Lehrerkürzel existiert bereits.'
      return
    }

    teachers.value.push({
      id: Date.now(),
      ...teacher
    })
  }

  return {
    teachers,
    error,
    createTeacher
  }
})
