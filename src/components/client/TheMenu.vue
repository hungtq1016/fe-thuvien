<template>
    <!-- <BannerConponent/> -->
    <GridWithoutFilter :key="this.resource" />
</template>

<script>
import GridWithoutFilter from '@/components/client/GridWithoutFilterComponent.vue'
import { mapActions, mapState } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { useLoadingStore } from '@/stores/loading';

    export default {
      components: { GridWithoutFilter},
      data() {
        return {
          resource : this.$route.path.split('/').slice(-1)[0]
        }
      },
      methods: {
        ...mapActions(useMenuStore,['fetchDataMenu']),
        ...mapActions(useLoadingStore,['setResource'])
      },
      mounted () {
        this.fetchDataMenu({resource:this.resource});
        this.setResource(this.resource)
      },
      computed:{
        ...mapState(useMenuStore,['dataMenu'])
      }
    }
</script>

