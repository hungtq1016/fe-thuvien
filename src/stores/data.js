import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading';
import { useTableStore } from './table';
import Swal from "sweetalert2";

export const useDataStore = defineStore('data',{
  state: () => ({
      itemSelected:[],
      putLoan:0,
      loading: useLoadingStore(),
      table : useTableStore(),
  }),

 
  actions:{
    getItem(value){
      this.itemSelected = value
    },
    getRequestLoan(value){
      this.putLoan = value
    },

    async postItem(item) {

      const url = this.loading.apiURL;
      const resource = this.loading.resource;
      const config = this.loading.config;

      await axios.post(`${url}/api/${resource}`,item,config)
      .then(res=>{
        Swal.fire( { title: 'Thành công!', text: res.data.message, icon: 'success', confirmButtonText: 'Hoàn thành', } )
        this.table.fetchDataTable()
        this.loading.toggleOpen(false)
      })
      .catch(error=>{
        Swal.fire( { title: 'Thất bại!', text: error.response.data.message, icon: 'error', confirmButtonText: 'Xác Nhận', } )
        console.log(error);
      })
    },

    async patchItem(payload) {

      const url = this.loading.apiURL;
      const resource = this.loading.resource;
      const config = this.loading.config;
      await axios.patch(`${url}/api/${resource}/${payload.id}`,payload,config)
      .then(res=>{
        Swal.fire( { title: 'Thành công!', text: res.data.message, icon: 'success', confirmButtonText: 'Hoàn thành', } )
        this.table.fetchDataTable()
        this.loading.toggleOpen(false)
      })
      .catch((error)=>{
        Swal.fire( { title: 'Thất bại!', text: error.response.data.message, icon: 'error', confirmButtonText: 'Xác Nhận', } )
      })
    },

    async patchStatusItem(item) {

      const url = this.loading.apiURL;
      const resource = this.loading.resource;
      const config = this.loading.config;

      await axios.put(`${url}/api/${resource}/${item.id}/update`,{status:item.status},config)
      .then((res)=>{
        console.log(res);
        this.table.fetchDataTable()
        Swal.fire( { title: 'Thành công!', text: 'Đổi trạng thái thành công', icon: 'success', confirmButtonText: 'Hoàn thành', } )
      })
      .catch(err=>console.log(err))
    },

    deleteItem(id) {

      const url = this.loading.apiURL;
      const resource = this.loading.resource;
      const config = this.loading.config;

      Swal.fire({ title: 'Bạn có chắc chắn muốn xóa?', text: "Sẽ không trở về lại như ban đầu!!!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Đồng ý', cancelButtonText: 'Hủy' }).then(async(result) => {
        if (result.isConfirmed) {
            await axios.delete(`${url}/api/${resource}/${id}`,config)
            .then((res) =>{
              Swal.fire( { title: 'Thành công!', text: res.data.message, icon: 'success', confirmButtonText: 'Hoàn thành', } )
              this.table.fetchDataTable()
            })
        }
      })
    },

    async putStatusLoan(item) {

      const url = this.loading.apiURL;
      const config = this.loading.config;

      await axios.put(`${url}/api/loan/${item.id}`,{loan_id:this.putLoan},config)
      .then(()=>{
        this.table.fetchDataTable()
        Swal.fire( { title: 'Thành công!', text: 'Đổi trạng thái thành công', icon: 'success', confirmButtonText: 'Hoàn thành', } )
      })
      .catch(err=>console.log(err))
    },
  }
  
})
