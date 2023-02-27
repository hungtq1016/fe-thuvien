<template>
    <TheMenu :key="this.$route.path.split('/').slice(-1)[0]"/>
</template>

<script>
import TheMenu from '@/components/client/TheMenu.vue';

    export default {
      components: { TheMenu },

    }
</script>

