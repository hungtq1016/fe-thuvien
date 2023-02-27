import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useMenuStore = defineStore('menu',{
  state: () => ({
    dataMenu: [],
    limit: 10,
    page: 1,
    resource:null,
    loading: useLoadingStore(),
  }),

  actions: {
    setResource(val){
      this.resource = val
    },
    async fetchDataMenu(payload) {
        const url = this.loading.apiURL;
  
        await axios.get(`${url}/api/${payload.resource}?page=${this.page}&limit=${this.limit}`)
          .then((response) => {
            this.dataMenu = response.data.data
          })
    },
  }
})
