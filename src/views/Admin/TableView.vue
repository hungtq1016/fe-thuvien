<template>
  <TheModal :key="resource"/>
  <TheTable :key="resource" />
</template>

<script>
import TheModal from "../../components/admin/TheModal.vue";
import TheTable from "../../components/admin/TheTable.vue";
import { mapActions,mapState } from 'pinia';
import {useLoadingStore} from '../../stores/loading';

export default {
  components: { TheTable, TheModal },
  methods: {
    ...mapActions(useLoadingStore,['setResource','setTitle'])
  },
  computed: {
    ...mapState(useLoadingStore,['resource'])
  },
  beforeMount() {
    this.setResource(this.$route.path.split('/').slice(-1)[0]),
    this.setTitle(this.$route.meta.title)
  },
};
</script>
