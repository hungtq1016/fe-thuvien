<template>
    <div class="bg-white">
      <div class="py-16 sm:py-24 mx-4 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Tất Cả</h2>
        </div>

        <div class="mt-4 flow-root">
          <div class="-my-2">
            <div class="box-content py-2 ">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-x-4 md:gap-y-6">
                <router-link :to="this.resource+'/'+item.id"
                v-for="item in this.dataMenu" :key="item.name"
                class="relative overflow-hidden rounded-lg hover:opacity-75 h-full min-h-[100px]">
                    <img :src="item.image.path" alt="" class="h-full w-full object-cover object-center" v-if="item.image"/>
                  <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
                  <span class="absolute inset-x-0 bottom-4 mt-auto text-center text-xl font-bold text-white">{{ item.name }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
import { mapState } from 'pinia';
import { useMenuStore } from '@/stores/menu';

    export default {
      computed: {
        ...mapState(useMenuStore,['dataMenu','resource']),

      },
    }
  </script>
