<template>
  <q-page padding>
    <div class="q-mt-xl flex justify-center" >
      <div class="q-mt-xl q-pa-md shadow-1">
        <div class="text-h4 q-ma-md text-center ">
          <q-avatar size="100px">
            <img src="icons/favicon-512x512.png">
          </q-avatar>
        </div>
        <q-form >
          <q-input outlined dense v-model="usuario" label="Usuario" color="amber-7" class="q-pa-md">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input outlined dense v-model="senha" label="Senha" color="amber-7" class="q-pa-md" type="password" >
            <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <!-- <template v-slot:append>
          <q-icon name="visibility" />
          </template> -->
          </q-input>
          <q-toggle v-model="remember" label="Lembra Minha senha" color="orange" />

          <q-btn @click="onSubmit" color="amber-9 full-width q-mt-xl" >Acessar</q-btn>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, inject, provide } from 'vue'
import bycryptjs from 'bcryptjs'

const usuario = ref('')
const senha = ref('')
const remember = ref(true)
const hash = ref(null)

export default defineComponent({
  // name: 'PageName'
  setup () {
    return {
      usuario,
      senha,
      remember,
      hash,
      isloging: inject('isloging')
    }
  },
  methods: {
    onSubmit () {
      this.isloging = !this.isloging
      if (this.remember) {
        bycryptjs.hash(this.senha, 10, (err: never, res: never) => {
          if (err) {
            console.log('error ', err)
          }
          console.log('Sucesso ', res)
          localStorage.setItem('senha', res)
        })
        console.log('ususaario')
        console.log(usuario.value)
        localStorage.setItem('usuario', usuario.value)
      }

      provide('isloging', this.isloging)
      this.$router.push('/')
    },

    getUser () {
      // eslint-disable-next-line no-const-assign
      usuario.value = localStorage.getItem('usuario') ? JSON.stringify(localStorage.getItem('usuario')).replaceAll('"', '') : ''
      senha.value = localStorage.getItem('senha') ? JSON.stringify(localStorage.getItem('senha')).replaceAll('"', '') : ''
    }
  },
  beforeMount () {
    this.getUser()
  }
})
</script>
