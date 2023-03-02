<template>
    <div class="sm:overflow-hidden sm:rounded-md mt-2">
        <div v-if="itemSelected">
            <router-link :to="{name:'BookDetail',params:{id:item.book.id}}"  v-for="item in itemSelected.loans" :key="item">
                <div class="flex justify-between py-1 ">
                    <span>{{item.book.name}}</span><span :class="textColor(item.detail.name)">{{item.detail.name}}</span>
                </div>
            </router-link>
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
        textColor(name){
            return name == 'Mất' ? 'text-red-600' 
            :name == 'Hết Hạn' ? 'text-amber-600' 
            :name == 'Đang Mượn' ? 'text-sky-600' : 'text-lime-600'

        },
        },
        computed:{
            ...mapState(useLoadingStore,['isUpdate']),
            ...mapState(useDataStore,['itemSelected'])
        }
    }
</script>
