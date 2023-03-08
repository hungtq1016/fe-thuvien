<template>
    <div>
        <div class="text-2xl pb-4 ">{{this.title}}</div>
        <div class="grid grid-cols-5 gap-x-1 gap-y-2">
            <label :for="item.name+item.id" v-for="item in this.expand ? data:data.slice(0,10)" :key="item.id"
            class="flex items-center gap-x-1 checked:border">
                <input type="checkbox" :id="item.name+item.id" class="focus:ring-0 focus:outline-none disabled:bg-red-100 disabled:border-red-600 rounded-full bg-lime-100 border-lime-600"
                :checked="item.isShow" :disabled="!item.isShow && this.totalChecked >=5" @click="patchMenu(item)">
                <span class="truncate">{{item.name}}</span>
            </label>
        </div>
        <div class="text-center pt-3">
            <button @click="this.expand = !expand"
            class="border border-sky-600 bg-sky-100 py-1 px-4 rounded-lg">{{this.expand ? "Thu Nhỏ" : "Mở Rộng"}}</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'pinia';
import { useLoadingStore } from '@/stores/loading';


    export default {
        props:['resource','title'],
        data() {
            return {
                data: [],
                expand:false,
            }
        },
        computed: {
            ...mapState(useLoadingStore,['apiURL','config']),
            totalChecked(){
                let total = 0;
                this.data.forEach(item => item.isShow ? total++ : '')
                return total;
            },
           
        },
        methods: {
            async fetchDataMenu(){
                await  axios.get(`${this.apiURL}/api/${this.resource}?limit=all`)
                .then((res)=>{
                    this.data = res.data
                })
                .catch(err=>console.log(err))
            },
            async patchMenu(item){
                let isShow = item.isShow ? false:true
 
                await  axios.patch(`${this.apiURL}/api/${this.resource}/${item.id}/update`,{isShow:isShow},this.config)
                .then(()=>{
                    this.fetchDataMenu()
                })
                .catch(err=>console.log(err))
            }
        },
        mounted () {
            this.fetchDataMenu()
        },
    }
</script>
