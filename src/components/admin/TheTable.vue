<template>
    <div class="mx-auto px-4 sm:px-6 md:px-8 dark:bg-zinc-700 rounded-lg dark:text-white bg-white text-black">
        <div class="py-4 sm:py-6 md:py-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <div class="py-4">
                            <label for="search-table" class="block text-sm font-medium text-gray-900 py-1">Tìm Kiếm</label>
                            <div class="flex max-w-sm">
                                <div class="flex items-center bg-gray-100 rounded-l-full border-r-0">
                                    <label for="search" class="sr-only">Search</label>
                                    <select id="search-table" autocomplete="off" v-model="searchField"
                                        class="h-full border-transparent bg-transparent pl-5 text-gray-900 focus:border-0 focus:ring-0 sm:text-sm">
                                        <option v-for="label in label" :key="label.value" :value="label.value">
                                            {{ label.text }}
                                        </option>
                                    </select>
                                </div>
                                <input type="text" id="search" v-model="searchValue" placeholder="Tìm tại đây"
                                    class="block w-full rounded-r-full border-none py-3 bg-gray-100 focus:ring-0 sm:text-sm placeholder:text-sky-600" />
                            </div>
                        </div>
                        <EasyDataTable :headers="label" :items-selected="itemsSelected" :items="dataTable"
                            :search-field="searchField" :search-value="searchValue" @click-row="showRow" 
                            table-class-name="!border-gray-300 py-2 rounded-lg"
                            body-row-class-name="even:bg-white odd:bg-gray-100"
                            body-item-class-name="!bg-transparent max-w-sm truncate"
                            body-expand-row-class-name="!bg-red-600" :rows-per-page="200" hide-footer>
                            <template #loading>
                                <img :src="'/logo/logo.png'"
                                    class="animate-spin mx-auto py-6" />
                            </template>
                            <template #empty-message>
                                <span>Dữ liệu không tìm thấy</span>
                            </template>
                            <template #item-image="item">
                                <template v-if="item.image">
                                    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-full my-1"
                                    v-if="item.image.split('/')[0]  == 'http:' || item.image.split('/')[0]  == 'https:'"/>
                                    <img :src="'/images/'+item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-full my-1"
                                        v-else/>
                                </template>
                            </template>
                            <template #item-desc="{ desc, country ,email }">
                                <span class="truncate" v-if="!email">{{
                                    desc ? desc : country
                                }}</span>
                                <span class="truncate" v-else>
                                    {{ email }}
                                </span>
                            </template>
                            <template #item-status="item">
                                <span v-if="item.role">
                                    {{ item.role.name }}
                                </span>
                                <template v-else>
                                    <button class="w-4 h-4 rounded-full"  @click="updateStatusRow(item)"
                                    :class=" item.status == 1 ? 'bg-lime-600' : 'bg-red-600' "></button>
                                </template>
                            </template>
                            <template #item-operation="item">
                                <div class="flex gap-x-2">
                                    <button @click="updateRow(item)">
                                        <PencilIcon class="w-5 h-5 text-gray-600 hover:text-black" />
                                    </button>
                                    <button @click="deleteRow(item)">
                                        <TrashIcon class="w-5 h-5 text-red-600 hover:animate-wiggle" />
                                    </button>
                                </div>
                            </template>
                        </EasyDataTable>
                        <PaginateComponent/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaginateComponent from './ThePagination.vue';
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import Swal from "sweetalert2";
import {mapActions,mapState} from 'pinia';
import {useLoadingStore} from '@/stores/loading';
import {useTableStore} from '@/stores/table';

export default {
    components: { PencilIcon, TrashIcon, PaginateComponent },
    data() {
        return {
            searchField: "name",
            searchValue: "",
            label: [ { value: "id", text: "ID", sortable: true }, { value: "name", text: "Tên", sortable: true }, { value: "image", text: "Hình ảnh", sortable: true }, { value: "desc", text: "Thông tin", sortable: true, width: 300, }, { value: "status", text: "Trạng thái", sortable: true }, { value: "operation", text: "Tùy Chỉnh" }, ],
            itemsSelected: []
        };
    },
    mounted() {
        this.fetchDataTable();
    },
    methods: {
        ...mapActions(useLoadingStore,['toggleUpdate','toggleOpen']),
        ...mapActions(useTableStore,['fetchDataTable','deleteItem']),

        showRow() {
        },
        updateRow(){
            this.toggleUpdate(true)
            this.toggleOpen(true)
        },
        deleteRow(item) {
            Swal.fire({ title: 'Bạn có chắc chắn muốn xóa?', text: "Sẽ không trở về lại như ban đầu!!!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Đồng ý', cancelButtonText: 'Hủy' }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteItem(item.id);
                    Swal.fire( { title: 'Thành công!', text: 'Đã xóa dòng thành công.', icon: 'success', confirmButtonText: 'Hoàn thành', } )
                }
            })
        },
        updateStatusRow(){
             
        },
    },
    computed: {
        ...mapState(useLoadingStore,['apiURL']),
        ...mapState(useTableStore,['dataTable','meta']),
    },
};
</script>
