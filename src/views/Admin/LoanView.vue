<template>
    <TheModal :key="resource"/>
    <TheTable :key="resource" :label="label"/>
  </template>
  
  <script>
  import TheModal from "@/components/admin/TheModal.vue";
  import TheTable from "@/components/admin/TheTable.vue";
  import { mapActions,mapState } from 'pinia';
  import {useLoadingStore} from '@/stores/loading';
  
  export default {
    components: { TheTable, TheModal },
    data() {
        return {
            label: [ 
            { value: "id", text: "ID", sortable: true }, 
            { value: "name", text: "Tên", sortable: true }, 
            { value: "email", text: "Email", sortable: true }, 
            { value: "loans", text: "Trạng Thái Mượn", sortable: true }, 
            { value: "role", text: "Quyền", sortable: true }, 
            { value: "option", text: "Chỉnh" }, ],

        }
    },
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
  