<template>
    <section>
        <div class="relative bg-gray-50 dark:bg-black px-6 py-10 lg:px-8 lg:py-16">
            <div class="absolute inset-0">
                <div class="h-1/3 bg-white dark:bg-zinc-900 sm:h-2/3" />
            </div>
            <div class="relative mx-auto max-w-7xl">
                <div class="text-left">
                    <div class="flex item-centers justify-between">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                            {{section.title}}
                        </h2>
                        <router-link :to="{name:'BookListCategory',params:{id:1}}"
                            class="text-lg text-sky-500  hover:text-sky-600 dark:text-red-500 dark:hover:text-red-600">
                            Xem thêm</router-link>
                    </div>
                    <p class="mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
                        {{section.desc}}
                    </p>
                </div>
                <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <VerticalItem v-for="book in dataBook" :key="book.id" :book="book"
                        class="flex flex-col overflow-hidden rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { useLoadingStore } from "@/stores/loading";
import { mapState } from 'pinia'
import VerticalItem from "../item/VerticalItem.vue";

export default {
    props:['section'],
    components: { VerticalItem },
    data() {
        return {
            dataBook: []
        }
    },
    methods: {
        async fetchDataBook(payload) {
  
        await axios.get(`${this.apiURL}/api/book?page=${this.page}&limit=${payload.limit}&slug=${payload.id}`)
          .then((response) => {
            this.dataBook = response.data.data
          })
      },
    },
    computed: {
        ...mapState(useLoadingStore,['apiURL']),
    },
    mounted () {
        this.fetchDataBook(this.section)
    },
};
</script>
