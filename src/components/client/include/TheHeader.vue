<template>
    <div class="px-1 md:px-2 lg:px-0 py-4 bg-sky-200 dark:bg-red-500">
        <div class="flex mx-auto max-w-7xl items-center justify-between">
            <router-link to="/" class="bg-sky-200 dark:bg-red-500">
                <img class="h-10 w-auto" :src="'http://api.tranhung.info/logo/logo.png'" alt="ITC" />
            </router-link>
            <div class="flex gap-x-2 items-center">
                <TheUser v-if="this.user"/>
                <TheLogin v-else/>
                <div>
                    <Switch v-model="isDark" :class="isDark ? 'bg-black' : 'bg-sky-100'" @click="useToggle(isDark)"
                        class="relative inline-flezx h-9 w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <span class="sr-only">Toggle Dark</span>
                        <span aria-hidden="true" :class="isDark ? 'translate-x-9' : 'translate-x-0'"
                            class="pointer-events-none h-8 w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4" v-if="isDark"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 fill-yellow-500" v-else><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>
                        </span>
                    </Switch>
                </div>
            </div>
        </div>
    </div>

    <Popover class=" bg-white dark:bg-zinc-900">
        <div class="mx-auto max-w-7xl px-1 md:px-2 lg:px-0">
            <div class="flex items-center py-2 md:pb-0 md:justify-between md:gap-x-10 gap-x-2">
                <div class="-my-2 -mr-2 md:hidden">
                    <PopoverButton
                        class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span class="sr-only">Open menu</span>
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                </div>
                <PopoverGroup as="nav" class="hidden md:flex">
                    <div v-for="item in navItems" :key="item.label" @click="setResource(item.resource)"
                        class="border-b-2 py-2 px-5 client-route duration-500 nav">
                        <router-link :to="'/'+item.resource" class="dropdown-route">
                            <TheDropdown  v-if="item.dropdown" :item="item"/>
                            <span to="#" class="text-base font-semibold !bg-white dark:!bg-zinc-900 !text-gray-500 hover:!text-gray-900 dark:!text-gray-300 dark:hover:!text-white"
                                v-else>{{ item.label }}</span>
                        </router-link>
                    </div>
                </PopoverGroup>

                <div class="relative max-w-lg md:mb-2 flex-auto min-h-[40px]">
                    <div class="flex items-center justify-end" :class="{ 'hidden': isSearchOpen }">
                        <select id="input" v-model="selected"
                            class="rounded-l-full focus:ring-0 focus:outline-none border-0 bg-gray-100">
                            <option value="all">T???t C???</option>
                            <option value="book">S??ch</option>
                            <option value="category">Th??? Lo???i</option>
                            <option value="author">T??c Gi???</option>
                        </select>
                        <input type="text" name="search" id="search" autocomplete="off"
                            placeholder="T??m s??ch, t??c gi???, v??n h???c..."
                            class="rounded-r-full bg-gray-100 border-none pr-5 py-2 md:py-2.5 focus:ring-0 sm:text-sm w-full max-w-xs" />
                    </div>
                    <div class="absolute top-1/2 -translate-y-1/2 right-0">
                        <button
                            class="inline-flex items-center text-sm font-medium text-gray-400 p-2.5 rounded-full bg-gray-100"
                            @click="this.isSearchOpen = !isSearchOpen">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400 " fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="absolute bg-white p-7" v-show="isOpen">
                        <div v-for="item in solutions" :key="item.name"
                            class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600"
                                    aria-hidden="true" />
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-500">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <PopoverPanel focus class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="px-5 pt-5 pb-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <img class="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company" />
                            </div>
                            <div class="-mr-2">
                                <PopoverButton
                                    class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </PopoverButton>
                            </div>
                        </div>
                        <div class="mt-6">
                            <nav class="grid gap-y-8">
                                <a v-for="item in solutions" :key="item.name" :href="item.href"
                                    class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                                    <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600"
                                        aria-hidden="true" />
                                    <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div class="space-y-6 py-6 px-5">
                        <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                            <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>

                            <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Docs</a>
                            <a v-for="item in resources" :key="item.name" :href="item.href"
                                class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
                        </div>
                        <div>
                            <a href="#"
                                class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign
                                up</a>
                            <p class="mt-6 text-center text-base font-medium text-gray-500">
                                Existing customer?
                                {{ ' ' }}
                                <a href="#" class="text-indigo-600 hover:text-indigo-500">Sign in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>
<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel, Switch } from '@headlessui/vue'
import { ArrowPathIcon, Bars3Icon, BookmarkSquareIcon, CalendarIcon, ChartBarIcon, CursorArrowRaysIcon, LifebuoyIcon, PhoneIcon, PlayIcon, ShieldCheckIcon, Squares2X2Icon, XMarkIcon, } from '@heroicons/vue/24/outline'
import { useDark, useToggle } from '@vueuse/core';
import { mapActions, mapState } from 'pinia';
import { useLoadingStore } from '@/stores/loading';
import { useUserStore } from '@/stores/user';
import TheLogin from './TheLogin.vue';
import TheUser from './TheUser.vue';
import TheDropdown from './TheDropdown.vue';

export default {
    data() {
        return {
            isDark: useDark(),
            selected: "all",
            isOpen: false,
            isSearchOpen: true,
            solutions: [{ name: "Analytics", description: "Get a better understanding of where your traffic is coming from.", href: "#", icon: ChartBarIcon, }, { name: "Engagement", description: "Speak directly to your customers in a more meaningful way.", href: "#", icon: CursorArrowRaysIcon, }, { name: "Security", description: "Your customers' data will be safe and secure.", href: "#", icon: ShieldCheckIcon }, { name: "Integrations", description: "Connect with third-party tools that you're already using.", href: "#", icon: Squares2X2Icon, }, { name: "Automations", description: "Build strategic funnels that will drive your customers to convert", href: "#", icon: ArrowPathIcon, },],
            callsToAction: [{ name: "Watch Demo", href: "#", icon: PlayIcon }, { name: "Contact Sales", href: "#", icon: PhoneIcon },],
            navItems: [
                {
                    label: "Trang Ch???",
                    resource: "",
                    dropdown:false,
                },
                {
                    label: "Th??? Lo???i",
                    resource: "category",
                    name:"BookListCategory",
                    dropdown: true
                },
                {
                    label: "T??c Gi???",
                    resource: "author",
                    name:"BookListAuthor",
                    dropdown: true
                },
                {
                    label: "Ng??nh H???c",
                    resource: "major",
                    dropdown:false
                },
                {
                    label: "Th??ng Tin",
                    resource: "about",
                    dropdown:false
                }
            ]
        };
    },
    methods: {
        ...mapActions(useLoadingStore, ["setResource"])
    },
    components: { TheLogin, TheUser, TheDropdown },
    computed: {
        ...mapState(useUserStore,['user'])
    },
}
</script>
<script setup>
const resources = [
    {
        name: 'Help Center',
        description: 'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: LifebuoyIcon,
    },
    {
        name: 'Guides',
        description: 'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkSquareIcon,
    },
    {
        name: 'Events',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]

</script>
