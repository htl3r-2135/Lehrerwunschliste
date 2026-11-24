import { createRouter, createWebHistory } from 'vue-router'
import TeacherListView from '../views/TeacherListView.vue'
import TeacherCreateView from '../views/TeacherCreateView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      redirect: '/lehrer' 
    },
    { path: '/lehrer', 
      name: 'teacher-list', 
      component: TeacherListView 
    },
    { path: '/lehrer/neu', 
      name: 'teacher-create', 
      component: TeacherCreateView 
    },
  ],
})

export default router