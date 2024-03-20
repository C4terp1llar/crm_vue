import { createRouter, createWebHistory } from 'vue-router'
import AppAuth from "@/views/Auth.vue";
import AppReg from "@/views/Reg.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: MainLayout,
    children: [
      {
        path: '', // Редирект по умолчанию на account
        redirect: '/home/account'
      },
      {
        path: '/home/account',
        name: 'account',
        component: () => import('../views/MainAccount.vue')
      },
      {
        path: '/home/history',
        name: 'history',
        component: () => import('../views/MainHistory.vue')
      },
      {
        path: '/home/planning',
        name: 'planning',
        component: () => import('../views/MainPlanning.vue')
      },
      {
        path: '/home/new',
        name: 'new',
        component: () => import('../views/MainNew.vue')
      },
      {
        path: '/home/categories',
        name: 'categories',
        component: () => import('../views/MainCategories.vue')
      },
      {
        path: '/home/profile',
        name: 'profile',
        component: () => import('../views/MainProfile.vue')
      }
    ]
  },
  {
    path: '/enter', // Стартовый
    alias: '/',
    component: EmptyLayout,
    children: [
      {
        path: '', // Редирект по умолчанию на авторизацию
        redirect: '/enter/auth'
      },
      {
        path: '/enter/auth',
        name: 'auth',
        component: AppAuth
      },
      {
        path: '/enter/reg',
        name: 'reg',
        component: AppReg
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
  routes
})

export default router