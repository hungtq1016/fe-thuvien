import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useBookStore = defineStore('book',{
  state: () => ({
    dataBook: [],
    limit: 12,
    page: 1,
    loading: useLoadingStore(),
  }),

  actions: {

    setLimit(val){
        this.limit == val
    },

    async fetchDataBook(payload) {
        const url = this.loading.apiURL;
  
        await axios.get(`${url}/api/book?page=${this.page}&limit=${payload.limit}&slug=${payload.slug}`)
          .then((response) => {
            // console.log(response.data.data);
            this.dataBook = response.data.data
          })
      },
  }
})
