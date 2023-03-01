import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useCommentStore = defineStore('comment',{
  state: () => ({
    comments: [],
    limit:5,
    page:1,
    book_id:null,
    loading: useLoadingStore(),
  }),
 getters: {
    averageRating(state){
      let total = 0;
      state.comments.forEach(item =>{
        total+=item.rate
      })
      return total/state.comments.length
    },
    countStar(state){
      let count = 0;
      state.comments.forEach(item =>{ 
        if (item.rate === state.star) {
          console.log(item.rate);
          count++ 
        }
      })
      return count;
    },
    countComments(state){
      return state.comments.length
    }
  },
  actions: {
    setBookId(val){
      this.book_id =val
    },
    setCount(){
      this.reviews.forEach((review) =>{ 
        this.comments.forEach(comment =>{
          console.log(123);
            if (review.star == comment.rate) {
              review.count++
            }
        })
      })
    },
      async fetchComments(payload) {
        const url = this.loading.apiURL;
        await axios.get(`${url}/api/comment?page=${this.page}&limit=${this.limit}&book_id=${payload.book_id}`)
          .then((response) => {
            this.comments = response.data.data
          })
    },
    async postComment(payload) {
        const url = this.loading.apiURL;
        const config = this.loading.config;
  
        await axios.post(`${url}/api/comment`,payload,config)
          .then(() => {
            this.fetchComments({book_id:this.book_id})
          })
    },
  }
})
