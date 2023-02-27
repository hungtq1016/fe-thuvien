<template>
    <TheMenu :key="this.$route.path.split('/').slice(-1)[0]"/>
</template>

<script>
import { mapState } from 'pinia';
import TheMenu from '../../components/client/TheMenu.vue';
import { useMenuStore } from '../../stores/menu';


    export default {
      components: { TheMenu },
      computed: {
        ...mapState(useMenuStore,['resource'])
      },
    }
</script>

