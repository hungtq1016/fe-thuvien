<template>
    <div class="inline-block bg-white p-1 rounded-md">
        {{ this.user.name}}
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';

    export default {
        computed: {
            ...mapState(useUserStore,['user'])
        },
    }
</script>
