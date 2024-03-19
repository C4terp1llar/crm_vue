import { createRouter, createWebHistory } from 'vue-router'
import AppAuth from "@/views/Auth.vue";
import AppReg from "@/views/Reg.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const routes = [
  {
    path: '/main',
    name: 'main',
    component: () => import('../layouts/MainLayout.vue')
  },
  {
    path: '/', // Стартовый
    component: EmptyLayout,
    children: [
      {
        path: '', // Редирект по умолчанию
        redirect: 'auth'
      },
      {
        path: 'auth',
        name: 'auth',
        component: AppAuth
      },
      {
        path: 'reg',
        name: 'reg',
        component: AppReg
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
