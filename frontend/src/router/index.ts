import { createRouter, createWebHistory } from 'vue-router'
import TeacherCreateView from '../views/TeacherCreateView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/lehrer/neu', 
      name: 'teacher-create', 
      component: TeacherCreateView 
    },
  ],
})

export default router