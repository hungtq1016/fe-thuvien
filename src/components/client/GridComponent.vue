<template>
    <section aria-labelledby="product-heading" class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <h2 id="product-heading" class="sr-only">Books</h2>
        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          <VerticalItem v-for="book in dataBooks.books" :key="book.id" :book="book"/>
        </div>
      </section>
</template>

<script>
import { useBookStore } from '../../stores/book';
import VerticalItem from './item/VerticalItem.vue'
import { mapState } from 'pinia'
    export default {
        components:{VerticalItem},
        computed: {
          ...mapState(useBookStore,['dataBooks'])
        },
    }
</script>
