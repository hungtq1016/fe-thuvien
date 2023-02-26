<template>
    <div class="bg-white dark:bg-black">
        <TheRecommend/>
        <TheSection v-for="item in section" :key="item.slug" :section="item"/>
        <div class="bg-sky-200 dark:bg-red-600">
            <div class="max-w-7xl mx-auto py-4 text-center ">
                <h1 class="text-4xl font-bold leading-[52px] text-white dark:text-gray-200">Theo thể loại</h1>
            </div>
        </div>

        <TheCategory v-for="category in categories" :key="category.slug" :category="category"/>
    </div>
</template>

<script>
    import TheRecommend from "@/components/client/home/TheRecommend.vue";
    import TheSection from "@/components/client/home/TheSection.vue";
    import TheCategory from "@/components/client/home/TheCategory.vue";
    import axios from "axios";
    import { mapState } from "pinia";
    import { useLoadingStore } from "../../stores/loading";

    export default {
        components: { TheRecommend,TheSection,TheCategory},
        data(){
            return{
                section:[
                    {
                        title:'Xem Nhiều',
                        desc:'Tài liệu được mượn nhiều nhất trong tất cả thời gian',
                        slug:'hot',
                        limit:4
                    },
                    {
                        title:'Mới Nhất',
                        desc:'Tài liệu mới được thêm vào',
                        slug:'new',
                        limit:4
                    },
                    {
                        title:'Top tháng',
                        desc:'Được mượn nhiều nhất trong tháng vừa qua',
                        slug:'monthly',
                        limit:4
                    },
                    {
                        title:'Theo Ngành',
                        desc:'Tài liệu chuyên ngành',
                        slug:'major',
                        limit:4
                    },
                ],
                categories:[]
            }
        },
        async mounted() {
            await axios.get(`${this.apiURL}/api/category/?type=more&limit=5`)
            .then(res=>{
                this.categories = res.data;
            })
        },
        computed: {
            ...mapState(useLoadingStore,['apiURL'])
        },
    };
</script>
