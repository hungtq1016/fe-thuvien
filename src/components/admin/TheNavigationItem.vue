<template>
    <router-link v-for="item in navigation" :key="item.label" :to="{name:item.name}" @click="toggle(item)"
    class="text-slate-900 dark:text-gray-300 hover:dark:bg-gray-700 hover:text-white hover:bg-sky-600 hover:dark:text-red-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
        <component :is="item.icon"
        class="text-gray-400 dark:group-hover:text-red-800 group-hover:text-slate-100 mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
        {{ item.label }}
    </router-link>
</template>

<script>
import { BuildingOfficeIcon, BookOpenIcon, TagIcon, HomeIcon, ExclamationCircleIcon, UsersIcon, AcademicCapIcon , QueueListIcon, TableCellsIcon, LanguageIcon, NewspaperIcon } from '@heroicons/vue/24/outline'
import { mapActions as actionPinia} from 'pinia';
import {useLoadingStore} from '../../stores/loading';

import { mapActions } from 'vuex'
export default {
    data() {
        return {
            navigation: [
                { label: 'Trang Quản Lý', resource: '',name:'AdminDashboard' ,icon: HomeIcon },
                { label: 'Người Dùng', resource: 'user',name:'AdminUser' ,icon: UsersIcon },
                { label: 'Sách', resource: 'book',name:'AdminBook' ,icon: BookOpenIcon },
                { label: 'Thể Loại', resource: 'category',name:'AdminCategory' ,icon: QueueListIcon },
                { label: 'Nhãn Dán', resource: 'tag',name:'AdminTag' ,icon: TagIcon },
                { label: 'Tác Giả', resource: 'author',name:'AdminAuthor' ,icon: NewspaperIcon },
                { label: 'Ngành Học', resource: 'major',name:'AdminMajor' ,icon: AcademicCapIcon },
                { label: 'Kệ Sách', resource: 'bookshelf',name:'AdminBookShelf' ,icon: TableCellsIcon },
                { label: 'Vai Trò', resource: 'role',name:'AdminRole' ,icon: ExclamationCircleIcon },
                { label: 'Nhà Xuất Bản', resource: 'publisher',name:'AdminPublisher' ,icon: BuildingOfficeIcon },
                { label: 'Ngôn Ngữ', resource: 'language',name:'AdminLanguage' ,icon: LanguageIcon },
            ]
        }
    },
    methods:{
        ...mapActions(['getDataTable']),
        ...actionPinia(useLoadingStore,['setResource','setTitle']),
        toggle(item){
            this.getDataTable({resource:item.resource,page:1});
            this.setResource(item.resource)
            this.setTitle(item.label)
        }
    },
}
</script>
