import axios from 'axios'
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading';

export const useTableStore = defineStore('table',{
  state: () => ({
        dataTable:[],
        limit:10,
        links:[],
        meta:[],
        page:1
  }),


  actions: {
    async fetchDataTable() {
        const loading = useLoadingStore()
        await axios.get(`${loading.apiURL}/api/${loading.resource}?page=${this.page}&limit=${this.limit}`)
            .then((response) => {
                this.dataTable = response.data.data
                this.links=  response.data.links
                this.meta = response.data.meta
        })
    },
  },
  
})
