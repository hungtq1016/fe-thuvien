<template>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white rounded-lg dark:text-white text-black">
        <div class="py-4 flex items-center justify-between">
            <div class="text-2xl font-semibold dark:text-white text-slate-900 uppercase">Quản Lý Mượn </div>
        </div>
    </div>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white rounded-lg dark:text-white text-black divide-y">
        <ChartBarComponent loan="loan" title="Mượn / Trả Sách"/>
        <ChartBarComponent loan="loss" title="Hết Hạn / Mất Sách"/>
    </div>
</template>

<script>
import ChartBarComponent from '@/components/admin/Dashboard/ChartBarComponent.vue';

export default {
  name: 'App',
  components: { ChartBarComponent },
}
</script>