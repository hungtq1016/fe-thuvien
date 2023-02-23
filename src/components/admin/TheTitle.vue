<template>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 bg-white  rounded-lg">
        <h1 class="text-2xl font-semibold dark:text-white text-slate-900 py-4 upper case">
            {{ this.title }}
        </h1>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import {useLoadingStore} from '../../stores/loading';

export default {
    computed: {
        ...mapState(useLoadingStore,['title'])
    },
}
</script>
