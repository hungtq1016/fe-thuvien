import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading';
import Swal from "sweetalert2";

export const useImageStore = defineStore('image', {
  state: () => ({
    dataImage: [],
    limit: 12,
    page: 1,
    loading: useLoadingStore(),
  }),

  actions: {
    async fetchDataImage() {
      const url = this.loading.apiURL;

      await axios.get(`${url}/api/image?page=${this.page}&limit=${this.limit}`)
        .then((response) => {
          this.dataImage = response.data.data
        })
    },

    async moreImage() {
      const url = this.loading.apiURL;
      this.page++;

      await axios.get(`${url}/api/image?page=${this.page}&limit=${this.limit}`)
        .then((response) => {
          this.dataImage.push(...response.data.data);
        })
    },

    async postImage(item) {

      const url = this.loading.apiURL;
      const config = this.loading.config;

      await axios.post(`${url}/api/image`, item, config)
        .then(res => {
          Swal.fire({ title: 'Thành công!', text: res.data.message, icon: 'success', confirmButtonText: 'Hoàn thành', })
          this.fetchDataImage()
          this.loading.toggleOpen(false)
        })
        .catch(error => {
          Swal.fire({ title: 'Thất bại!', text: error.response.data.message, icon: 'error', confirmButtonText: 'Xác Nhận', })
          console.log(error);
        })
    },
    async putStatusImage(item) {

      const url = this.loading.apiURL;
      const config = this.loading.config;

      await axios.put(`${url}/api/image/${item.id}/update`, { status: item.status }, config)
        .then((res) => {
          console.log(res);
          this.fetchDataImage()
          Swal.fire({ title: 'Thành công!', text: 'Đổi trạng thái thành công', icon: 'success', confirmButtonText: 'Hoàn thành', })
        })
        .catch(err => console.log(err))
    },
    deleteImage(id) {

      const url = this.loading.apiURL;
      const config = this.loading.config;

      Swal.fire({ title: 'Bạn có chắc chắn muốn xóa?', text: "Sẽ không trở về lại như ban đầu!!!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Đồng ý', cancelButtonText: 'Hủy' }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${url}/api/image/${id}`, config)
            .then((res) => {
              Swal.fire({ title: 'Thành công!', text: res.data.message, icon: 'success', confirmButtonText: 'Hoàn thành', })
              this.fetchDataImage()
            })
        }
      })
    },
  },
})
