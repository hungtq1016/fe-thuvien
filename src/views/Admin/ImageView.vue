<template>
    <TheModal :key="resource"/>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 rounded-lg dark:text-white bg-white text-black">
        <div class="py-4 sm:py-6 md:py-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
                            <template v-for="item in dataImage" :key="item.id">
                                <div class="relative group">
                                    <img class="max-h-56 h-full object-cover w-full rounded-lg border border-gray-100"
                                    :src="item.path" :alt="item.name">
                                    <div class="truncate mt-3">{{item.name}}</div>
                                    <button  @click="deleteImage(item.id)"
                                    class="absolute duration-700 translate-x-full -z-10 group-hover:z-10 group-hover:translate-x-0 group-hover:right-2 right-0 top-2 bg-black bg-opacity-50 w-4 h-4 rounded-full flex items-center justify-center">
                                        <XMarkIcon class="w-4 h-4 text-gray-200"/>
                                    </button>
                                    <button class="absolute left-2 top-2">
                                        <button class="w-3 h-3 rounded-full"  @click="putStatusImage(item)"
                                        :class=" item.status == 1 ? 'bg-lime-600' : 'bg-red-600' "></button>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheModal from "../../components/admin/TheModal.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { mapActions,mapState } from 'pinia';
import {useLoadingStore} from '../../stores/loading';
import {useImageStore} from '../../stores/image';

export default {
  components: {  TheModal,XMarkIcon },
  methods: {
    ...mapActions(useLoadingStore,['setResource','setTitle']),
    ...mapActions(useImageStore,['fetchDataImage','putStatusImage','deleteImage'])
  },
  computed: {
    ...mapState(useLoadingStore,['resource']),
    ...mapState(useImageStore,['dataImage'])
  },
  mounted() {
    this.fetchDataImage()
  },
  beforeMount() {
    this.setResource(this.$route.path.split('/').slice(-1)[0]),
    this.setTitle(this.$route.meta.title)
  },
};
</script>