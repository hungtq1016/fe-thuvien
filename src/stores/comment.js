import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'

export const useCommentStore = defineStore('comment',{
  state: () => ({
    comments: [],
    loading: useLoadingStore(),
  }),

  actions: {

    async postComment(payload) {
        const url = this.loading.apiURL;
        const config = this.loading.config;
  
        await axios.post(`${url}/api/comment`,payload,config)
          .then((response) => {
            console.log(response);
          })
    },
  }
})
