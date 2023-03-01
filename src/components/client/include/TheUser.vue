<template>
    <div>

    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user'

    export default {
        computed: {
            ...mapState(useUserStore,['user'])
        },
    }
</script>