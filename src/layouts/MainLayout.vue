<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-orange text-white">
        <q-btn
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

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
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
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

    return {
      Menus: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
