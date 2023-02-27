<template>
  <TheGrid :key="this.id"/>
</template>

<script>
import TheGrid from "../../components/client/TheGrid.vue";

export default {
  props:['id'],
    components: {TheGrid },

};
</script>