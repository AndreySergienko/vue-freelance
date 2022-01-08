import { createRouter, createWebHistory } from 'vue-router'
import Tasks from "@/views/Tasks"
import New from '@/views/New'

const routes = [
  {
    path: '/tasks',
    name: 'Main',
    component: Tasks,
    alias: '/'
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
