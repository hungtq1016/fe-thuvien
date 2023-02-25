<template>
    <div>
        <label for="input" class="block text-sm font-medium text-gray-700 pt-2" >{{this.title}}</label >
        <div class="pt-1 rounded-lg relative">
            <div class="flex flex-wrap py-1">
                <div v-for="(item,index) in list" :key="index" class="rounded-lg bg-sky-100 border border-sky-600 py-[2px] px-1 flex items-center gap-x-1 group" >
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <select id="input"  v-model="selected" @change="handleChange"
            class="block w-full rounded-lg border border-gray-300 focus:ring-0 focus:outline-none focus:border-sky-600">
                <template v-for="(item,index) in resourceData" :key="index">
                    <option  :value="item">
                        {{ item.name }}
                    </option>
          
                </template>
            </select>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "pinia";
import {useLoadingStore} from '../../../stores/loading';
export default {
    props:['title','resource','data','propData'],
    data() {
        return {
            resourceData:[{
                name:null,
                id:null
            }],
            list:[],
        };
    },
    methods: {
        handleChange() {
            this.list[0] = this.selected
            this.$emit('dataChange', this.selected.id)
        }
    },
    async mounted(){
        await axios.get(`${this.apiURL}/api/${this.resource}?limit=all`).then((response)=>{this.resourceData = response.data})
        if(this.propData == null) {
           this.list = []
        }else{
            this.list[0] = this.propData
        }
    },
    computed: {
        ...mapState(useLoadingStore,['apiURL'])
    },
};
</script>
