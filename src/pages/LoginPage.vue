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
    <q-dialog v-model="msgError">
      <q-card style="width: 350px">
        <q-card-section class="bg-warning">
          <div class="text-h4">Atenção</div>
        </q-card-section>
        <q-card-section class="row items-center no-wrap">
          <div>
            <p class="text-6">{{ msg }}</p>
            <p></p>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="OK" color="orange" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import serverUrl from 'src/config/serverUrl'

const usuario = ref('')
const senha = ref('')
const remember = ref(true)
const hash = ref(null)
const codigo = ref(null)
const filial = ref(null)
const grupo = ref(null)
const msg = 'Sem msg'
const msgError = ref(false)
const pwdEncript = ref(null)
const user = ref(null)

export default defineComponent({
  // name: 'PageName'
  setup () {
    return {
      usuario,
      senha,
      remember,
      codigo,
      filial,
      grupo,
      hash,
      msg,
      msgError,
      user,
      pwdEncript,
      login: ref(null)
    }
  },
  watch: {
    remember (newRmember) {
      if (!newRmember) {
        localStorage.setItem('usuario', '')
        localStorage.setItem('senha', '')
        usuario.value = ''
        senha.value = ''
      }
    }
  },
  methods: {
    onSubmit () {
      // SOLUCORPTI&senha=102030
      const url = serverUrl() + '/HostCombateAPP/LogarUsuario?usuario=' + usuario.value.toUpperCase() + '&senha=' + senha.value
      // alert(url)
      axios.get(url)
        .then((response) => {
          if (response.data.filial != null) {
            codigo.value = response.data.codigo
            filial.value = response.data.filial
            grupo.value = response.data.grupo
            localStorage.setItem('grupo', grupo.value)
            localStorage.setItem('usuario', usuario.value)
            localStorage.setItem('codUsuario', codigo.value)
            localStorage.setItem('pwd', senha.value)
            localStorage.setItem('login', 'true')

            user.value = {
              filial: response.data.filial,
              grupo: grupo.value,
              codigo: response.data.codigo,
              usuario: usuario.value,
              login: true,
              senha: senha.value
            }

            localStorage.setItem('user', JSON.stringify(user.value))

            this.$router.push('/')
          } else {
            this.msg = usuario.value + ' ' + response.data.mensagem
            msgError.value = !msgError.value
            this.msg = response.data.mensagem
          }
        }).catch((error) => {
          if (error) {
            this.msg = usuario.value + ' Sem Acesso \n Verifique a senha ou o Usuario e tente novamente.'
            msgError.value = !msgError.value
          }
          console.log(error)
        })

      if (this.remember) {
        console.log(usuario.value)
      }
    }

  },
  beforeCreate () {
    usuario.value = localStorage.getItem('usuario')
    senha.value = localStorage.getItem('pwd')
  }
})
</script>
