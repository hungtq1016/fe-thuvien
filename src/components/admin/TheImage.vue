<template>
    <!-- <div class=" pb-2">
      <div class="relative inline">
        <input type="text" @keydown="searchImage" v-model="searchValue">
        <div class="absolute z-[5] bg-white inset-x-0" v-show="this.toggleSearch">
          <div v-for="search in searchResult" :key="search">{{search.name}}</div>
        </div>
      </div>
    </div> -->
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
    <div class="flex items-center justify-center">
        <button type="button" @click="moreImage" class="py-1 px-2 rounded-lg mt-4 bg-sky-100 text-sky-600">Xem Thêm</button>
    </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { mapActions,mapState } from 'pinia';
import {useImageStore} from '@/stores/image';

export default {
  components: { XMarkIcon },
  methods: {
    ...mapActions(useImageStore,['fetchDataImage','putStatusImage','deleteImage','moreImage']),
  },
  computed: {
    ...mapState(useImageStore,['dataImage'])
  },
  mounted() {
    this.fetchDataImage()
  },
};
</script>