<template>
    <section>
        <div class="relative bg-gray-50 dark:bg-black px-6 py-10 lg:px-8 lg:py-16">
            <div class="absolute inset-0">
                <div class="h-1/3 bg-white dark:bg-zinc-900 sm:h-2/3" />
            </div>
            <div class="relative mx-auto max-w-7xl">
                <div class="text-left">
                    <div class="flex item-centers justify-between">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl ">
                            {{category.name}}
                        </h2>
                        <router-link :to="{name: 'BookListCategory', params: { id: category.id }}"
                            class="text-lg text-sky-500  hover:text-sky-600 dark:text-red-500 dark:hover:text-red-600">
                            Xem thêm</router-link>
                    </div>
                    <p class="mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-4 truncate">
                        {{category.desc}}.
                    </p>
                </div>
                <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none grid-cols-1  lg:grid-cols-3">
                    <HorizontalItem v-for="book in books.slice(0,3)" :key="book.id" :book="book"
                        class="flex flex-col overflow-hidden rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import HorizontalItem from "../item/HorizontalItem.vue";

    export default {
        data() {
            return {
                books: []
            }
        },
        props:['category'],
        components: { HorizontalItem },
        async mounted () {
            await axios.get(`${this.apiURL}/api/category/${this.category.id}`)
            .then(res=>{
                this.books = res.data.data.books;
            });
        },
        computed: {
            ...mapState(useLoadingStore,['apiURL'])
        },
    }
</script>
