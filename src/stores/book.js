import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'
import { useUserStore } from './user';

export const useBookStore = defineStore('book',{
  state: () => ({
    dataBooks: [],
    book: {},
    limit: 10,
    page: 1,
    loading: useLoadingStore(),
    user: useUserStore(),
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

    async fetchFavorite() {
      const url = this.loading.apiURL;
      const user = this.user.user;

      await axios.get(`${url}/api/favorite?user_id=${user.id}&book_id=${this.book.id}`)
        .then((response) => {
          this.favorite = response.data
        })
        .catch(err=>console.log(err))
    },

    async postFavorite(){
      const url = this.loading.apiURL;
      const config = this.loading.config;
      const user = this.user.user;

      if (!user) {
        alert('Can Dang Nhap De Thich Sach')
        return -1
      }
      console.log(user.id+'id: '+this.book.id);
      await axios.post(`${url}/api/favorite`,{user_id:user.id,book_id:this.book.id},config)
        .then((response) => {
          console.log(response);
        })
        .catch(err=>console.log(err))
    }
  }
})
