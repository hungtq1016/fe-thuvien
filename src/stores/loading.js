import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

export const useLoadingStore = defineStore('loading',{
  state: () => ({
      apiURL: 'http://localhost:8000',
      config : { headers: { 
        Authorization: `Bearer ${ VueCookies.get("ltoken")}`} },
      resource: null,
      isModalOpen:false,
      isUpdate:false,
      user:VueCookies.get('info_user'),
      title: 'Trang Quản Lý'
  }),

  getters: {

  },

  actions: {
        setResource(value) {
            this.resource = value
        },
        setTitle(value) {
            this.title = value
        },
        setUser(value) {
            this.user = value
        },
        toggleOpen(value){
            this.isModalOpen = value
        },
        toggleUpdate(value){
            this.isUpdate = value
        },
  }
})
