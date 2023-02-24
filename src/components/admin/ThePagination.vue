<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white py-3 gap-x-6">
        <div>
            <select id="location" v-model="currentShow" @change="updateTable"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option v-for="show in showPerPage" :key="show">{{show}}</option>
            </select>
          </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-gray-500">
              Hiện từ {{ ' ' }} <span class="font-medium text-black">{{this.meta.from}}</span>
              {{ ' ' }} tới {{ ' ' }}
              <span class="font-medium text-black">{{this.meta.to}}</span>
              {{ ' ' }} trong {{ ' ' }}
              <span class="font-medium text-black">{{this.meta.total}}</span> {{ ' ' }} kết quả.
            </p>
          </div>
          <div>
            <nav class="flex rounded-full gap-x-1 px-4 py-1 bg-gray-100 " aria-label="Pagination">
                <button @click="fetchTableByLink(this.links.first)" :disabled="!this.links.prev"
               class="p-2 hover:text-sky-600 disabled:text-gray-300">
                <span class="sr-only">First</span>
                <ChevronDoubleLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <template v-for="(page,indexPage) in this.meta.links" :key="indexPage">
                    <button v-if="indexPage == 0" :disabled="!this.links.prev" 
                    @click="fetchTableByLink(page.url)"
                    class="p-2 hover:text-sky-600 disabled:text-gray-300">
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button v-else-if="indexPage == this.meta.links.length-1" :disabled="!this.links.next"
                    @click="fetchTableByLink(page.url)"
                    class="p-2 hover:text-sky-600 disabled:text-gray-300">
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
                    </button>
                    <button @click="fetchTableByLink(page.url)"
                    :class="{'bg-sky-600 !text-white rounded-full hover:!bg-sky-600':page.active}" v-else
                    class="py-2 px-4 text-gray-900 hover:bg-sky-400 hover:text-white rounded-full font-semibold">
                        <span>{{page.label}}</span>
                    </button>

              </template>
              <button @click="fetchTableByLink(this.links.last)" :disabled="!this.links.next"
              class="p-2 hover:text-sky-600 disabled:text-gray-300">
                <span class="sr-only">Last</span>
                <ChevronDoubleRightIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
    </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon ,ChevronDoubleRightIcon,ChevronDoubleLeftIcon} from '@heroicons/vue/20/solid';
import {mapActions,mapState} from 'pinia';
import {useTableStore} from '@/stores/table';
export default {
    components: {ChevronLeftIcon, ChevronRightIcon,ChevronDoubleRightIcon,ChevronDoubleLeftIcon},
    data() {
        return {
            currentShow  : 10,
            showPerPage : [5,10,25,50,100,200],
        };
    },
    methods: {
        ...mapActions(useTableStore,["fetchDataTable","fetchTableByLink","setLimit"]),
        updateTable(){
          this.setLimit(this.currentShow);
          this.fetchDataTable();
        }
    },
    computed: {
        ...mapState(useTableStore,["links","meta","limit"]),
    },
};

</script>
