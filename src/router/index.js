import { createRouter, createWebHistory } from 'vue-router'
import AppAuth from "@/views/Auth.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import store from "@/store";
import {sendAlert} from '@/helpers/alertHelper'

// мб еще для некоторых доделать лейзи лоадинг /+

const routes = [
  {
    path: '/:pathMatch(.*)*', // сравнение со всеми роутами (если не найден -> показ вьюшки с 404)
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true }, // хом и все вложенное требует наличия токена юзера (проверка через геттер, логика в ниже)
    children: [
      {
        path: '', // Редирект по умолчанию на account
        name: 'default-home',
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
        component: () => import('../views/MainHistory.vue'),
        children: [
          {
            path: ':entryId',
            name: 'entryInfo',
            component: () => import('../views/EntryInfo.vue'),
            props: true
          }
        ]
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
      },
    ]
  },
  {
    path: '/enter', // Стартовый
    alias: '/',
    name: 'enter',
    component: EmptyLayout,
    children: [
      {
        path: '', // Редирект по умолчанию на авторизацию
        name: 'default-empty',
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
        component: () => import('../views/Reg.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["auth/getToken"]) {
      next({ name: 'default-empty' }); // редирект на авторизацию если токена нет
      sendAlert('Вы не авторизованы! Войдите в аккаунт на странице авторизации или создайте новый на странице регистрации', 'error')
    } else {
      next(); // если есть токен
    }
  } else {
    if (
        (to.name === 'enter' || to.name === 'auth' || to.name === 'reg' || to.name === 'default-empty')
          &&
        store.getters["auth/getToken"])
    {
        next({ name: 'default-home' }); // если есть токен и юзер хочет на лэйаут с авторизацией
        sendAlert('Вы уже авторизованы! Если вы хотите выйти из аккаунта - закройте вкладку или выйдите из профиля в меню', 'error')
    }
    else {
      next(); // для маршрутов не требующих авторизации
    }
  }
});

export default router