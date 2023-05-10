import { defineStore } from 'pinia'

export const useLogin = defineStore('login', {
  state: () => ({
    token: false,
    usuario: ''
  }),
  actions: {
    agregarToken(tokenuser) {
      this.token = tokenuser
    },
    agregarUsuario(user) {
      this.usuario = user
    },
    eliminarLogin() {
      this.token = false
      this.usuario = ''
    }
  }
})
