import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useBookStore = defineStore('book',{
  state: () => ({
    dataBooks: [],
    book: {},
    limit: 10,
    page: 1,
    loading: useLoadingStore(),
    favorite:false
  }),

  actions: {
    async fetchDataBooks(payload) {
      const url = this.loading.apiURL;
      await axios.get(`${url}/api/${payload.resource}/${payload.id}`)
        .then((response) => {
          this.dataBooks = response.data.data
        })
    },

    async fetchBook(payload) {
      const url = this.loading.apiURL;

      await axios.get(`${url}/api/book/${payload.id}`)
        .then((response) => {
          this.book = response.data.data
        })
    },

    async fetchFavorite(payload) {
      const url = this.loading.apiURL;
      const config = this.loading.config;

      await axios.post(`${url}/api/favorite`,payload,config)
        .then((response) => {
          console.log(response);
        })
        .catch(err=>console.log(err))
    },
  }
})
