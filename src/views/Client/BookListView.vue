<template>
  <TheGrid :key="this.id"/>
</template>

<script>
import TheGrid from "@/components/client/TheGrid.vue";
import { mapActions } from "pinia";
import { useLoadingStore } from "@/stores/loading";

export default {
    props:['id'],
    components: {TheGrid },
    data() {
      return {
        resource: this.$route.path.split('/')[1]
      }
    },
    methods: {
      ...mapActions(useLoadingStore,['setResource'])
    },
    mounted() {
      this.setResource(this.resource)
    },

};
</script>