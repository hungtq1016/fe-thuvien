<template>
    <div class="sm:overflow-hidden sm:rounded-md">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="space-y-4 bg-white py-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Tên Tác Giả</label>
                    <div class="mt-1 flex rounded-lg">
                      <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          <UserIcon class="w-4 h-5"/>
                      </span>
                      <input type="text" id="name" placeholder="Nhập tên tác giả..." v-model="form.name" autocomplete="family-name"
                      class="block w-full flex-1 rounded-none rounded-r-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm"/>
                    </div>
                </div>
                <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Quốc Gia</label>
                    <div class="mt-1 flex rounded-lg">
                      <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          <GlobeAsiaAustraliaIcon class="w-4 h-5"/>
                      </span>
                      <input type="text" id="country" placeholder="Nhập quốc gia..." v-model="form.country" autocomplete="country"
                      class="block w-full flex-1 rounded-none rounded-r-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm"/>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <div>
                        <label for="yob" class="block text-sm font-medium text-gray-700">Ngày Sinh</label>
                        <div class="mt-1 flex rounded-lg">
                          <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                              <ClockIcon class="w-4 h-5"/>
                          </span>
                          <input type="date" v-model="form.yob"
                          class="w-full rounded-r-lg border-gray-300">
                        </div>
                    </div>
                    <div :class="{'hidden':!isDeath}">
                        <label for="yod" class="block text-sm font-medium text-gray-700">Ngày Mất</label>
                        <div class="mt-1 flex rounded-lg">
                          <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                              <ClockIcon class="w-4 h-5"/>
                          </span>

                          <input type="date" v-model="form.yod" :max="this.currentDate"
                          class="w-full rounded-r-lg border-gray-300">
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-x-3 px-1">
                    <input type="checkbox" class="rounded-md ring-sky-600 checked:bg-sky-600 checked:ring-0 checked:outline-none hover:bg-sky-600 checked:hover:bg-sky-400"
                    id="is-death" v-model="isDeath" @click="isDeathToggle"><label for="is-death" class="font-medium text-gray-700">Đã mất</label>
                </div>
                <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">Giới Tính</label>
                    <div class="grid grid-cols-3 gap-x-4 mt-1">
                        <label for="Nam">
                            <input class="peer hidden" type="radio" id="Nam" value="Nam" name="gender" v-model="form.gender">
                            <div class="border border-gray-300 rounded-lg py-3 peer-checked:border-sky-600 peer-checked:text-sky-600 font-medium text-gray-400 pl-3 hover:border-sky-600 hover:text-sky-600">
                                Nam
                            </div>
                        </label>
                        <label for="Nữ">
                            <input class="peer hidden" type="radio" id="Nữ" value="Nữ" name="gender" v-model="form.gender">
                            <div class="border border-gray-300 rounded-lg py-3 peer-checked:border-sky-600 peer-checked:text-sky-600 font-medium text-gray-400 pl-3 hover:border-sky-600 hover:text-sky-600">
                                Nữ
                            </div>
                        </label>
                        <label for="Khác">
                            <input class="peer hidden" type="radio" id="Khác" value="Khác" name="gender" v-model="form.gender">
                            <div class="border border-gray-300 rounded-lg py-3 peer-checked:border-sky-600 peer-checked:text-sky-600 font-medium text-gray-400 pl-3 hover:border-sky-600 hover:text-sky-600">
                                Khác
                            </div>
                        </label>
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
import { UserIcon, GlobeAsiaAustraliaIcon,ClockIcon } from "@heroicons/vue/24/outline";
import { useDataStore } from "@/stores/data";
import { useLoadingStore } from "@/stores/loading";
import { mapActions,mapState } from 'pinia'
import ImageSelectComponent from "../Input/ImageSelectComponent.vue";

    export default {
        components:{UserIcon,GlobeAsiaAustraliaIcon,ClockIcon,ImageSelectComponent},
        data(){
            return{
                isDeath:false,
                form:{
                    name:'',
                    country:'',
                    yob: null,
                    yod: null,
                    gender:'Nam',
                    image_id:1
                },
                propImage:null
            }
        },
        methods: {
            isDeathToggle(){
                this.isDeath = !this.isDeath;
                this.form.yod = (this.form.yod == null) ? this.currentDate : null
            },
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
                this.isDeath = this.itemSelected.yod != 'null' ? true : false
            }
        },
        computed:{
            currentDate(){
                const currentDate = new Date();
                let month = currentDate.getMonth()+1;
                month = month < 10 ? '0'+month :month
                return  currentDate.getFullYear() + '-' + month + '-' + currentDate.getDate()
            },
            ...mapState(useLoadingStore,['isUpdate']),
            ...mapState(useDataStore,['itemSelected'])
        }
    }
</script>
