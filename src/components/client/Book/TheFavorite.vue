<template>
    <button type="button" @click="toggleFavorite"
        class="flex items-center justify-center rounded-md py-3 px-3 border" :class="colorFavorite">
        <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
        <span class="sr-only">Toggle favorite</span>
    </button>

</template>

<script>
import { HeartIcon } from '@heroicons/vue/24/solid';
import { mapActions, mapState } from 'pinia';
import { useBookStore } from '@/stores/book';

    export default {
        props:['book'],
        components: { HeartIcon },
        methods: {
            ...mapActions(useBookStore,['postFavorite','fetchFavorite','deleteFavorite']),
            toggleFavorite(){
                this.isFavorite ? this.deleteFavorite() : this.postFavorite()
            }
        },
        computed: {
            ...mapState(useBookStore,['isFavorite']),
            colorFavorite(){
                return this.isFavorite ? 'text-gray-600 hover:bg-gray-200 bg-gray-100 hover:text-gray-500 border-gray-600'
                : 'text-red-600 hover:bg-red-200 bg-red-100 hover:text-red-500 border-red-600'
            }
        },
        watch: {
            book() {
                this.fetchFavorite();
            } 
        }
        
    }
</script>
