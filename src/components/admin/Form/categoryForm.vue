<template>
    <div class="sm:overflow-hidden sm:rounded-md">
        <form @submit.prevent="submitForm" enctype='multipart/form-data'>
            <div class="space-y-4 bg-white py-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Tên Thể Loại</label>
                    <div class="mt-1 flex rounded-lg">
                      <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          <QueueListIcon class="w-4 h-5"/>
                      </span>
                      <input type="text" id="name" placeholder="Nhập tên thể loại..." v-model="form.name" autocomplete="name"
                      class="block w-full flex-1 rounded-none rounded-r-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm"/>
                    </div>
                </div>
                <div>
                    <label for="desc" class="block text-sm font-medium text-gray-700">Thông Tin</label>
                    <div class="mt-1 rounded-lg">
                      <textarea id="desc" placeholder="Nhập thông tin thể loại..." v-model="form.desc" rows="4" autocomplete="off"
                      class="block w-full flex-1 rounded-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm resize-none"/>
                    </div>
                </div>
                <ImageSelectComponent @dataChange="val=>{this.form.image_id=val}" :propImage="propImage"/>
            </div>
            <div class="text-right">
              <button type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm
              hover:bg-sky-600 focus:outline-none focus:ring-0 focus:ring-sky-600 focus:ring-offset-2">Xác Nhận</button>
            </div>

        </form>
      </div>
</template>

<script>
import { QueueListIcon } from "@heroicons/vue/24/outline";
import { useDataStore } from "@/stores/data";
import { useLoadingStore } from "@/stores/loading";
import { mapActions,mapState } from 'pinia'
import ImageSelectComponent from "../Input/ImageSelectComponent.vue";

    export default {
        components:{ QueueListIcon, ImageSelectComponent },
        data(){
            return{
                form:{
                    name:'',
                    desc:'',
                    image_id:1
                },
                propImage:null
            }
        },
        methods: {
            submitForm(){
                this.isUpdate ? this.patchItem(this.form) : this.postItem(this.form)
            },
            ...mapActions(useDataStore,['postItem','patchItem']),

        },
        mounted() {
            if(this.isUpdate){
                this.form = this.itemSelected
                this.form.image_id = this.itemSelected.image !=null ? this.itemSelected.image.id : null
                this.propImage = this.itemSelected.image;
            }
        },
        computed:{
            ...mapState(useLoadingStore,['isUpdate']),
            ...mapState(useDataStore,['itemSelected'])
        }
    }
</script>
