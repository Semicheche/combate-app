import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'login' },
    children: [
      { name: 'login', path: '/login', component: () => import('pages/LoginPage.vue') },
      { name: 'index', path: '/', component: () => import('pages/IndexPage.vue') },
      { name: 'scanner', path: 'scanner', component: () => import('pages/ScannerPage.vue') },
      { name: 'dashboard', path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { name: 'setup', path: 'setup', component: () => import('pages/SetupPage.vue') },
      { name: 'detalehs', path: 'detalhes/:codigo', component: () => import('pages/DetalheProdutoPage.vue'), props: true }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
