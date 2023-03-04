<template>
    <Popover class="relative" v-slot="{ open }" >
        <PopoverButton
            :class="[open ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-300 dark:hover:text-white', 'group inline-flex items-center rounded-md text-base font-semibold hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-0']">
            <span>{{item.label}}</span>
            <ChevronDownIcon
                :class="[open ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-300 dark:hover:text-white', 'ml-2 h-5 w-5 group-hover:text-gray-900 dark:group-hover:text-gray-300']"
                aria-hidden="true" />
        </PopoverButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute z-50 mt-3 w-44 transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="relative grid gap-6 bg-white dark:bg-zinc-900 px-2 py-4 sm:p-4">
                        <router-link :to="{ name: item.name, params: { id: dropItem.id }}"
                             v-for="dropItem in dropdown"
                            :key="dropItem.id"
                            class="text-base font-medium truncate subClient-route text-gray-900 dark:text-gray-300 -m-3 flex items-start rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white sub-nav">{{
                                dropItem.name
                            }}</router-link>

                    </div>
                    <span class="block bg-white dark:bg-gray-900">
                        <router-link :to="'/'+item.resource"
                            class="flow-root rounded-md p-3 transition duration-150 ease-in-out !bg-gray-100 dark:!bg-zinc-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <span class="text-sm font-medium text-sky-600 dark:text-red-600">
                                Xem thêm
                            </span>
                        </router-link>
                    </span>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { mapState } from 'pinia';
import { useLoadingStore } from '@/stores/loading';
import axios from 'axios';

export default {
    props:['item'],
    data() {
        return {
            dropdown: []
        }
    },
    components: {Popover, PopoverButton, PopoverPanel,ChevronDownIcon },
    computed: {
        ...mapState(useLoadingStore,['apiURL'])
    },
    methods: {
        async fetchDropdown() {
            await axios.get(`${this.apiURL}/api/${this.item.resource}?limit=all&q=menu`)
            .then(respone=>this.dropdown = respone.data)
            .catch(err=>console.log(err))
        }
    },
    mounted() {
        this.fetchDropdown()
    },
}
</script>
