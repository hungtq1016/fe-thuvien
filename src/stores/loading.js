import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading',{
  state: () => ({
      apiURL: 'http://localhost:8000',
      resource: null,
      isModalOpen:false,
      isUpdate:false,
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
        toggleOpen(value){
            this.isModalOpen = value
        },
        toggleUpdate(value){
            this.isUpdate = value
        }
  }
})
