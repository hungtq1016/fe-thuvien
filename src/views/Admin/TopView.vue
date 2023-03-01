<template>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white rounded-lg dark:text-white text-black">
        <!-- Replace with your content -->
        <div class="py-4">
            <Bar :data="this.data" :options="this.options" />
        </div>
        <!-- /End replace -->
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Bar
  },
  data() {
    return {
            data: {
                labels: [
                    'Thứ 2',
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ Nhật',
                ],
                datasets: [
                    {
                        label: 'Sách Mượn Trong Tuần',
                        backgroundColor: '#0284BE',
                        data: [40, 20, 12, 39, 10, 40, 0]
                    }
                ]
            }, options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
  }
}
</script>