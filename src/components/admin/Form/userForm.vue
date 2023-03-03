<template>
    <div class="sm:overflow-hidden sm:rounded-md mt-2">
        <div v-if="itemSelected">
            <div v-for="item in itemSelected.loans" :key="item"
            class="flex justify-between py-1 px-2 rounded-md my-1 hover:bg-gray-100">
                <router-link :to="{name:'BookDetail',params:{id:item.book.id}}"
                >{{item.book.name}}</router-link>
                <button :class="textColor(item.detail.name)" @click="this.isUpdate ? putStatusLoan(item) : ''"
                v-if="item.detail.name != 'Đã Trả'">{{item.detail.name}}</button>
                <div v-else class="text-lime-600">{{item.detail.name}}</div>
            </div>
        </div>
        <span v-else>
            Không có dữ liệu
        </span>
      </div>
</template>

<script>
import { useLoadingStore } from "@/stores/loading";
import { useDataStore } from "@/stores/data";
import { mapActions,mapState } from 'pinia'
    export default {
        methods: {
        ...mapActions(useLoadingStore,['toggleOpen']),
        ...mapActions(useDataStore,['putStatusLoan']),
        textColor(name){
            return name == 'Mất' ? 'text-red-600' 
            :name == 'Hết Hạn' ? 'text-amber-600' :'text-sky-600'
        },
        },
        computed:{
            ...mapState(useLoadingStore,['isUpdate']),
            ...mapState(useDataStore,['itemSelected','putLoan'])
        }
    }
</script>
