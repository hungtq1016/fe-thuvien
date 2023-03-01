import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

export const useUserStore = defineStore('user',{
  state: () => ({
      user:VueCookies.get('info_user'),
  }),

  getters: {

  },

  actions: {
      
  }
})
