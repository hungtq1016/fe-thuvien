<template>
    <TheModal :key="resource"/>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 rounded-lg dark:text-white bg-white text-black">
        <div class="py-4 sm:py-6 md:py-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <TheImage/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState } from 'pinia';
import {useLoadingStore} from '@/stores/loading';
import TheImage from "@/components/admin/TheImage.vue";
import TheModal from "../../components/admin/TheModal.vue";

export default {
  components: {TheModal, TheImage},
  methods: {
    ...mapActions(useLoadingStore,['setResource','setTitle']),
  },
  computed: {
    ...mapState(useLoadingStore,['resource']),
  },
  beforeMount() {
    this.setResource(this.$route.path.split('/').slice(-1)[0]),
    this.setTitle(this.$route.meta.title)
  },
};
</script>