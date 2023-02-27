<template >
    <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center" v-if="book.image">
        <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img src="https://fastly.picsum.photos/id/570/500/800.jpg?hmac=yMQ-H9msXG3QRNe4_yKXJ3NWZ9gj8EwvhWdN0uZfH5g" :alt="book.image.name" class="h-full w-full object-cover object-center" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useBookStore } from '@/stores/book';

    export default {
        computed: {
            ...mapState(useBookStore,['book'])
        },
    }
</script>

