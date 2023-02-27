<template>
    <!-- <BannerConponent/> -->
    <GridWithoutFilter :key="this.resource"/>
</template>

<script>
import BannerConponent from '@/components/client/banner/BannerConponent.vue'
import GridWithoutFilter from '@/components/client/GridWithoutFilterComponent.vue'
import { mapActions, mapState } from 'pinia';
import { useMenuStore } from '@/stores/menu';

    export default {
      components: { BannerConponent ,GridWithoutFilter},
      data() {
        return {
          resource : this.$route.path.split('/').slice(-1)[0]
        }
      },
      methods: {
        ...mapActions(useMenuStore,['fetchDataMenu'])
      },
      mounted () {
        this.fetchDataMenu({resource:this.resource});
      },
      computed:{
        ...mapState(useMenuStore,['dataMenu'])
      }
    }
</script>

