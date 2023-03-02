<template>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white rounded-lg dark:text-white text-black">
        <div class="py-4 flex items-center justify-between">
            <span>Quản Lý Mượn / Trả</span>
            <select v-model="sortBy" @change="fetchDataLoan"
            class="rounded-full border-none py-3 bg-gray-100 focus:ring-0 sm:text-sm placeholder:text-sky-600">
              <option value="week">Tuần Này</option>
              <option value="subWeek">Tuần Trước</option>
              <option value="month">Tháng Này</option>
              <option value="subMonth">Tháng Trước</option>
              <option value="year">Năm</option>
              <option value="all">Tất Cả</option>
            </select>
        </div>
    </div>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white rounded-lg dark:text-white text-black">
      <div class="py-4">
          <Bar :data="this.data" :options="this.options" />
      </div>
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs'
import axios from 'axios'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
  data() {
    return {
      data: {
        labels: [],
        datasets: [{}]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      sortBy:'week'
    }
  },
  methods: {
    async fetchDataLoan() {
      await axios.get(`http://localhost:8000/api/loan?q=admin&sortBy=${this.sortBy}`).then(res=>{
       this.data = res.data.data
    });
    }
  },
  mounted(){
    this.fetchDataLoan()
  },
}
</script>