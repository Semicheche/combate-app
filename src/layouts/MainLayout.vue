<template>
  <q-layout view="hHh Lpr lFf">
    <q-header >
      <q-toolbar class="bg-orange text-white">
        <q-btn v-if="isloging"
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
        <q-btn v-if="isloging"
          flat
          dense
          round
          icon="exit_to_app"
          aria-label="Sair"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="isloging"
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

        <q-item-section>
          <q-item-label>{{ usuario }}</q-item-label>
          <q-item-label caption>Vendas</q-item-label>
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
    <div class=" fixed-bar full-width " v-if="isloging && $q.platform.is.mobile">
    <q-btn-group spread>
      <!-- <q-btn color="orange" :hidden="true" label="" icon="dashboard" style="min-height: 50px;" to="/dashboard" ></q-btn> -->
      <q-btn color="orange" label="" icon="home" to="/" style="min-height: 50px;"></q-btn>
      <q-btn color="orange" label="" icon="qr_code" to="/scanner"></q-btn>
    </q-btn-group>
  </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import MenuApp from 'components/MenuApp.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'Combate Moveis',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Scanner',
    caption: 'Consuta de Estoque e Preços',
    icon: 'qr_code_scanner',
    link: 'scanner'
  }
  // {
  //   title: 'Dashboard',
  //   caption: 'Consuta vendas e Resultados',
  //   icon: 'dashboard',
  //   link: 'dashboard'
  // }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuApp
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const isloging = ref(false)
    const $q = useQuasar()

    provide('isloging', isloging)
    return {
      usuario: localStorage.getItem('usuario'),
      Menus: linksList,
      isloging,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      authUser () {
        if (isloging.value) {
          this.$router.push('/home')
        } else {
          this.$router.push('/login')
        }
      },
      logout () {
        isloging.value = !isloging.value
        provide('isloging', isloging)
        this.$router.push('/login')
      }
    }
  },

  beforeCreate () {
    this.authUser()
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
