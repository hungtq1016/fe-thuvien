import axios from 'axios'
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading';

export const useTableStore = defineStore('table', {

  state: () => ({
    dataTable: [],
    limit: 10,
    links: [],
    meta: [],
    page: 1,
    loading: useLoadingStore(),
  }),

  actions: {
    setLimit(value){
      this.limit = value
    },

    async fetchDataTable() {
      const url = this.loading.apiURL;
      const resource = this.loading.resource;

      await axios.get(`${url}/api/${resource}?page=${this.page}&limit=${this.limit}`)
        .then((response) => {
          this.dataTable = response.data.data
          this.links = response.data.links
          this.meta = response.data.meta

      })
    },


    async fetchTableByLink(url) {
      
      await axios.get(`${url}&limit=${this.limit}`)
        .then((response) => {
          this.dataTable = response.data.data
          this.links = response.data.links
          this.meta = response.data.meta
      })
    },

  },

})
