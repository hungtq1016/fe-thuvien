<template>
    <BannerConponent  :key="this.id"/>
    <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pt-24 pb-10">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{dataBooks.name}}</h1>
        </div>

        <div class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <FilterComponent :key="this.id"/>
            <GridComponent  :key="this.id"/>
        </div>
      </main>
</template>

<script>
import BannerConponent from "@/components/client/banner/BannerConponent.vue";
import GridComponent from "@/components/client/GridComponent.vue";
import FilterComponent from "@/components/client/FilterComponent.vue";
import {mapActions,mapState} from 'pinia';
import {useBookStore} from '@/stores/book'
export default {
    components: { BannerConponent,GridComponent,FilterComponent},
    data() {
      return {
        resource: this.$route.path.split('/')[1],
        id:this.$route.params.id,
      }
    },
  
    methods: {
      ...mapActions(useBookStore,['fetchDataBooks']),
    },
    mounted(){
      this.fetchDataBooks({resource:this.resource,id:this.id})
    },
    computed: {
      ...mapState(useBookStore,['dataBooks']),
    },
};
</script>