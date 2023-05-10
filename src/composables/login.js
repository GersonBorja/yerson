import { defineStore } from 'pinia'

export const useLogin = defineStore('login', () => {
  
  let token = false
  
  const agregarToken = (tokenuser) => {
    token.value = tokenuser
  }
  
  return {
    token,
    agregarToken
  }
})