<template>
    <div class="py-4">
        <div class="flex items-center justify-between">
            <div>{{this.title}}</div>
            <select v-model="sortBy" @change="fetchDataLoan"
                class="rounded-full border-none py-3 bg-gray-100 focus:ring-0 sm:text-sm placeholder:text-sky-600">
            <option v-for="data in dataOption" :key="data.value" :value="data.value">{{ data.label }}</option>
            </select>
        </div>
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
  components: { Bar },
  props:['loan','title'],
  data() {
    return {
      data: {
        labels: [],
        datasets: [{}]
      },
      dataOption:[
        {value:'week',label:'Tuần'},
        {value:'subWeek',label:'Tuần Trước'},
        {value:'month',label:'Tháng'},
        {value:'subMonth',label:'Tháng Trước'},
        {value:'year',label:'Năm'},
        {value:'all',label:'Tất Cả'},
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      sortBy:'week',
    }
  },
  methods: {
    async fetchDataLoan() {
            await axios.get(`http://localhost:8000/api/loan?q=${this.loan}&sortBy=${this.sortBy}`).then(res => {
                this.data = res.data.data
            });
        },
  },
  mounted(){
    this.fetchDataLoan()
  },
}
</script>