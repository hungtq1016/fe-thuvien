<template>
    <div>
        <div class="text-sm font-medium text-gray-700">Kho Ảnh 
            <span class="ml-2 text-sky-600 bg-sky-100 px-1 rounded-lg inline-flex items-center">
                <button type="button" @click="this.isOpen = !isOpen">+</button>
            </span>
        </div>
        <div :class="{'hidden':!isOpen}" >
            <form id="uploadImage" @submit.prevent="submitForm">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="onFileChange"
                class="py-2">
                <button form="uploadImage" type="submit" class="border border-sky-600 text-sky-600 bg-sky-100 py-1 px-2 rounded-lg">Xác nhận</button>
            </form>
        </div>
        <div class="overflow-y-scroll h-60 grid grid-cols-3 gap-2 mt-1">
            <template v-for="image in this.dataImage" :key="image.id">
                <label :for="image.id">
                    <input  type="radio" :id="image.id" :value="image" v-model="imageSelected" @change="chooseImageId" name="image"
                    class="peer hidden">
                    <img :src="image.path" :alt="image.name" 
                    class="h-20 w-full rounded-lg object-cover border border-gray-300 peer-checked:border-sky-600">
                </label>
            </template>
            
        </div>
    </div>
    <div>
        <div class="text-sm font-medium text-gray-700">Hình Ảnh Đã Chọn</div>
        <img :src="imageSelected.path" :alt="imageSelected.name" 
        class="max-h-40 object-cover mt-1">
    </div>
</template>

<script>
import axios from 'axios';
import { useLoadingStore } from '@/stores/loading';
import { useImageStore } from '@/stores/image';
import {mapActions, mapState} from 'pinia'

    export default {
        props:['propImage'],
        data() {
            return {
                images: [],
                imageSelected:{
                    id:null,
                    name:null,
                    path:null
                },
                page:1,
                isOpen:false,
                file:null,
            }
        },
        methods: {
            chooseImageId() {
                this.$emit('dataChange',this.imageSelected.id)
            },
            onFileChange(e) {
                this.hasImage = true;
                const file = e.target.files[0];
                this.file= file;
            },
            async submitForm() {
                let payload = new FormData();
                payload.append("name", 'Không có tên');
                payload.append("image", this.file);
                await axios.post(`${this.apiURL}/api/image`, payload, this.config)
                .then(async ()=>{
                    await axios.get(`${this.apiURL}/api/image?page=${this.page}&limit=9`).then((response)=>{this.images = response.data.data})
                })
            },
            ...mapActions(useImageStore,['fetchDataImage'])
        },
        mounted () {
            // await axios.get(`${this.apiURL}/api/image?page=${this.page}&limit=9`).then((response)=>{this.images = response.data.data}),
            this.fetchDataImage(),
            this.propImage != null?this.imageSelected=this.propImage: null
        },
        computed:{
            ...mapState(useLoadingStore,['apiURL','config']),
            ...mapState(useImageStore,['dataImage'])
        }
    }
</script>
