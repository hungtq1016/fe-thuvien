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
    isFavorite:false,
    id_favorite:null
  }),

  actions: {
    async fetchDataBooks(payload) {
      const url = this.loading.apiURL;
      await axios.get(`${url}/api/${payload.resource}/${payload.id}`)
        .then((response) => {
          this.dataBooks = response.data.data,
          this.isFavorite = false,
          this.id_favorite = null
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
      if (!user) {
        this.isFavorite = false;
        return -1
      }
      await axios.get(`${url}/api/favorite?user_id=${user.id}&book_id=${this.book.id}`)
        .then((response) => {
          if (!response.data) {
            return -1
          }
          this.id_favorite = response.data.id,
          this.isFavorite = true
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
      await axios.post(`${url}/api/favorite`,{user_id:user.id,book_id:this.book.id},config)
      .then(()=>this.isFavorite=true)
        .catch(err=>console.log(err))
    },
    async deleteFavorite(){
      const url = this.loading.apiURL;
      const config = this.loading.config;

      await axios.delete(`${url}/api/favorite/${this.id_favorite}`,config)
      .then(()=>this.isFavorite=false)
        .catch(err=>console.log(err))
    }
  }
})
