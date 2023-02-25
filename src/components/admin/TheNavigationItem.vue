<template>
    <router-link v-for="item in navigation" :key="item.label" :to="{name:item.name}" @click="toggle(item)"
    class="text-gray-600 
    hover:bg-sky-100 hover:text-sky-600 flex items-center gap-x-2 px-4 py-2 rounded-lg admin-route">
        <component :is="item.icon"
        class="h-6 w-6" aria-hidden="true" />
        <span>{{ item.label }}</span>
    </router-link>
</template>

<script>
import { BuildingOfficeIcon, BookOpenIcon, TagIcon,PhotoIcon, HomeIcon, ExclamationCircleIcon, UsersIcon, AcademicCapIcon , QueueListIcon, TableCellsIcon, LanguageIcon, NewspaperIcon } from '@heroicons/vue/24/outline'
import { mapActions} from 'pinia';
import {useLoadingStore} from '@/stores/loading';
import {useDataStore} from '@/stores/data';

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
                { label: 'Kho Hình', resource: 'image',name:'AdminImage' ,icon: PhotoIcon },
            ]
        }
    },
    methods:{
        ...mapActions(useDataStore,['fetchDataTable']),
        ...mapActions(useLoadingStore,['setResource','setTitle']),
        toggle(item){
            this.setResource(item.resource)
            this.setTitle(item.label)
        }
    },
}
</script>
