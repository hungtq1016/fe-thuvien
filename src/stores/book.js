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
  }
})