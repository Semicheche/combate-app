<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-orange text-white">
        <q-btn v-if="login != ''"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Combate App
        </q-toolbar-title>

        <q-btn v-if="login != ''"
          flat
          dense
          round
          icon="exit_to_app"
          aria-label="Sair"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>
    <q-drawer v-if="login != ''"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/img/avatar2.jpg"> -->
            <q-icon name="account_circle" size="lg" color="orange"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section v-if="login != ''">
          <q-item-label>{{ user.usuario }}</q-item-label>
          <q-item-label  caption>{{ grupos[user.grupo] }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
      <q-list>
        <q-item-label
          header
        >
         Menu
        </q-item-label>

        <MenuApp
          v-for="link in Menus"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <div class=" fixed-bar full-width " v-if="login != '' && $q.platform.is.mobile">
    <q-btn-group spread>
      <q-btn color="orange" :hidden="true" label="" icon="leaderboard" style="min-height: 50px;" to="/dashboard" ></q-btn>
      <q-btn color="orange" label="" icon="home" to="/" style="min-height: 50px;"></q-btn>
      <q-btn color="orange" label="" icon="qr_code" to="/scanner"></q-btn>
    </q-btn-group>
  </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import MenuApp from 'components/MenuApp.vue'
import getUser from 'src/config/getUser'

const grupos = {
  0: 'T.I ',
  1: 'Vendas',
  4: 'Gerente',
  15: 'Gerente'
}

const linksList = [
  {
    title: 'Principal',
    caption: 'Combate Moveis',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Consulta Produto',
    caption: 'Consulta de Estoque e Preços',
    icon: 'qr_code_scanner',
    link: '/scanner'
  },
  {
    title: 'Minhas Vendas',
    caption: 'Consulta vendas por vendedor',
    icon: 'leaderboard',
    link: '/dashboard'
  },
  {
    title: 'Minha Meta',
    caption: 'Consulta das Metas',
    icon: 'query_stats',
    link: '/minha-meta'
  },
  {
    title: 'Minha Comissão',
    caption: 'Consulta das comissões ',
    icon: 'paid',
    link: '/comissao'
  },
  {
    title: 'Minha Pontuação',
    caption: 'Consulta pontuação Combate Maior Melhor',
    icon: 'timeline',
    link: '/pontuacao'
  },
  {
    title: 'Vendas Vendedores',
    caption: 'Analise vendas por vendedor',
    icon: 'person_search',
    link: '/vendas'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuApp
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const usuario = ref(localStorage.getItem('ususario'))
    const grupo = ref(localStorage.getItem('grupo'))
    const login = ref(localStorage.getItem('login'))

    return {
      user: getUser(),
      Menus: linksList,
      grupos,
      leftDrawerOpen,
      rightDrawerOpen,
      login,
      $q: useQuasar(),
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      async getUser () {
        grupo.value = await localStorage.getItem('grupo')
        usuario.value = await localStorage.getItem('usuario')
      },

      logout () {
        login.value = ''
        localStorage.setItem('login', login.value)
        this.user.login = false
        this.$router.push('/login')
      }
    }
  },
  beforeCreate () {
    getUser().then((response) => {
      if (response != null) {
        this.user = ref(response)

        if (this.user) {
          if ((this.user.grupo === 1)) {
            this.Menus.pop()
          }
          if ((this.user.grupo === 0)) {
            this.Menus.push(
              {
                title: 'Configurações APP',
                caption: 'T.I.',
                icon: 'settings_applications',
                link: '/setup'
              }
            )
          }
        }
      }
    })
  },
  watch: {
    async $route (to) {
      if (to.name === 'index') {
        const u = await getUser()

        this.user.value = ref(u)
        location.reload()
      }
    }
  }

})
</script>
<style>
.fixed-bar  {
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
