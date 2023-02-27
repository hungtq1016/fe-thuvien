import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useMenuStore = defineStore('menu',{
  state: () => ({
    dataMenu: [],
    limit: 10,
    page: 1,
    loading: useLoadingStore(),
  }),

  actions: {

    async fetchDataMenu(payload) {
        const url = this.loading.apiURL;
  
        await axios.get(`${url}/api/${payload.resource}?page=${this.page}&limit=${this.limit}`)
          .then((response) => {
            this.dataMenu = response.data.data
          })
    },
  }
})
