<template>
    <router-link to="/login" class="flex items-center group rounded-full bg-white max-h-9">
        <span class="hidden group-hover:inline duration-1000 ml-2.5 font-semibold">Đăng Nhập</span>
        <span class="p-2.5 bg-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 h-4">
                <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
        </span>
    </router-link>
    <router-link to="/login?action=register" class="flex items-center group rounded-full bg-white max-h-9">
        <span class="hidden group-hover:inline duration-500 ml-2.5 font-semibold">Đăng Ký</span>
        <span class="p-2.5 bg-white rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4">
                <path
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg> </span>
    </router-link>
</template>

<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user'

    export default {
        computed: {
            ...mapState(useUserStore,['user'])
        },
    }
</script>