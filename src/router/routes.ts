import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'login' },
    children: [
      { name: 'login', path: '/login', component: () => import('pages/LoginPage.vue') },
      { name: 'index', path: '/', component: () => import('pages/IndexPage.vue'), props: true },
      { name: 'scanner', path: 'scanner', component: () => import('pages/ScannerPage.vue') },
      { name: 'dashboard', path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { name: 'setup', path: 'setup', component: () => import('pages/SetupPage.vue') },
      { name: 'detalhes', path: 'detalhes/:codigo', component: () => import('pages/DetalheProdutoPage.vue'), props: true },
      { name: 'minha-meta', path: 'minha-meta', component: () => import('pages/MinhaMetasPage.vue') },
      { name: 'minha_meta', path: 'minha-meta/:dtIni/:dtFim', component: () => import('pages/MinhaMetasPage.vue'), props: true },
      { name: 'comissao', path: 'comissao', component: () => import('pages/MinhaComissaoPage.vue'), props: true },
      { name: 'pontuacao', path: 'pontuacao', component: () => import('pages/PontuacaoPage.vue'), props: true },
      { name: 'vendas', path: 'vendas', component: () => import('pages/VendasVendedoresPage.vue'), props: true }
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
