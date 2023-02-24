import axios from 'axios'
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading';
import VueCookies from 'vue-cookies'

export const useTableStore = defineStore('table', {

  state: () => ({
    dataTable: [],
    limit: 10,
    links: [],
    meta: [],
    page: 1,
    loading: useLoadingStore(),
    config : { headers: { Authorization: `Bearer ${ VueCookies.get("ltoken")}`, 'Content-Type': 'multipart/form-data' } }
  }),

  actions: {
    setLimit(value){
      this.limit = value
    },

    test(){
      console.log(1);
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

      async deleteItem(id) {
        console.log(this.config.headers);
        const url = this.loading.apiURL;
        const resource = this.loading.resource;

        await axios.delete(`${url}/api/${resource}/${id}`, this.config)
        this.test()
    },

    // async updateStatus({ getters, dispatch }, payload) {
    //     await axios.put(`http://api.tranhung.info/api/${payload.resource}/${payload.id}/update`, { status: payload.status }, config);
    //     dispatch(`getDataTable`, {resource:payload.resource, page: getters.getMeta.current_page})
    // },

    // async postData({ getters, dispatch }, payload) {
    //     await axios.post(`http://api.tranhung.info/api/${getters.getResource}`,payload,config).then(res=>console.log(res)).catch(err=>console.log(err));
    //     dispatch(`getDataTable`, {resource:getters.getResource, page: getters.getMeta.current_page})
    // },

    // async putData({ getters, dispatch }, payload) {
    //     await axios.put(`http://api.tranhung.info/api/${getters.getResource}/${getters.getUpdateData.id}`,payload,config).then(res=>console.log(res)).catch(err=>console.log(err));
    //     dispatch(`getDataTable`, {resource:getters.getResource, page: getters.getMeta.current_page})
    // },
  },

})
