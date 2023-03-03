<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8" >
            <!-- book details -->
            <div class="lg:max-w-lg lg:self-end">
                <nav aria-label="Categories">
                    <ol role="list" class="flex items-center gap-x-2 gap-y-1 flex-wrap" >
                        <li v-for="(category, index) in book.categories" :key="category.id" >
                            <div class="flex items-center text-sm">
                                <a :href="category.slug" class="font-medium text-gray-500 hover:text-gray-900" >{{ category.name }}</a >
                                <svg v-if="index !== book.categories.length - 1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="ml-2 h-5 w-5 flex-shrink-0 text-gray-300" >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div class="mt-4">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" >
                        {{ book.name }}
                    </h1>
                </div>

                <section aria-labelledby="information-heading" class="my-4">
                    <h2 id="information-heading" class="sr-only">
                        Thông tin sách
                    </h2>

                    <div class="flex items-center">
                        <p class="text-lg text-gray-900 sm:text-xl">
                            {{ book.quantity }}
                        </p>

                        <div class="">
                            <h2 class="sr-only">Đánh giá</h2>
                            <div class="flex items-center gap-x-2">
                                <div>
                                    <!-- <StarRating :rating="book.rating" :read-only="true" :show-rating="false" star-size="16" /> -->
                                    <p class="sr-only">
                                        {{ book.rating }} out of 5 stars
                                    </p>
                                </div>
                                <p class="text-gray-500 mt-1">
                                    10 đánh giá
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 space-y-6">
                        <p class="text-base text-gray-500">
                            {{ book.desc }}
                        </p>
                    </div>

                    <div class="mt-6 flex items-center">
                        <CheckIcon class="h-5 w-5 flex-shrink-0 text-lime-500" aria-hidden="true" />
                        <p class="ml-2 text-sm text-gray-500">Còn sách</p>
                    </div>
                </section>
                <section v-for="label in labels" :key="label.name" class="border-t border-gray-300" >
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left" >
                            <span :class="[ open ? 'text-sky-600' : 'text-gray-900', 'text-sm font-medium', ]" >{{ label.label }}</span >
                            <ChevronUpIcon :class=" open ? 'rotate-180 transform !text-sky-600' : '' " class="h-5 w-5 text-gray-900" />
                        </DisclosureButton>
                        <DisclosurePanel as="div" class="flex gap-x-2 pb-6 items-center" >
                            <div v-for="(value, indexVal) in book[label.name]" :key="indexVal" class="flex text-sm" >
                                {{ value.name }}
                                <svg v-if=" indexVal !== book[label.name].length - 1 " viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" class="ml-2 w-1 flex-shrink-0 text-gray-900" >
                                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                                </svg>
                            </div>
                        </DisclosurePanel>
                    </Disclosure>
                </section>
            </div>

            <!-- book image -->
            <TheImage/>

            <!-- book form -->
            <div
                class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start"
            >
                <section aria-labelledby="options-heading">
                    <h2 id="options-heading" class="sr-only">book options</h2>
                    <div class="block text-sm font-medium text-gray-700 pb-2" >
                        Chương Khác
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <router-link :to="{name:'BookDetail',params:{id:series.id}}" v-for="series in book.series" :key="series.slug" >
                            <div class="border p-1 truncate rounded-lg bg-sky-100 border-sky-600">
                                {{series.name}}
                            </div>
                        </router-link>
                    </div>
                    <div class="flex pt-6 pb-4 gap-x-4">
                        <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" @click="addToLoan(book)"
                         class="flex-auto px-6 py-2.5 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out" >
                            Mượn Sách
                        </button>
                        <button type="button" @click="this.postFavorite"
                        class="flex items-center justify-center rounded-md py-3 px-3 text-red-600 hover:bg-red-200 bg-red-100 hover:text-red-500 border border-red-600" >
                            <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" v-if="!this.favorite"/>
                            <span class="sr-only">Add to favorites</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
        <TheComment/>
        <TheSection :section="section" />

    </div>
</template>
<script>
import TheSection from '@/components/client/home/TheSection.vue';
// import StarRating from "vue-star-rating";
import { CheckIcon,HeartIcon,ChevronUpIcon } from "@heroicons/vue/20/solid";
import { Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import { mapActions, mapState } from 'pinia';
import { useBookStore } from '@/stores/book';
import { useLoanStore } from '@/stores/loan';
import TheComment from './Book/TheComment.vue';
import TheImage from './Book/TheImage.vue';
import { useUserStore } from '../../stores/user';

export default {
    components: { CheckIcon, Disclosure, DisclosureButton, DisclosurePanel, HeartIcon, ChevronUpIcon, TheSection, TheComment, TheImage },
    data() {
        return {
            openComment:false,
            labels:[
                {label:'Thông tin suất bản',name:'publisher'},
                {label:'Tác giả',name:'authors'},
                {label:'Chuyên ngành',name:'major'},
                {label:'Kệ Sách',name:'bookshelf'},
                {label:'Nhãn',name:'tags'},
            ],
            section:{
                title:'Xem Nhiều',
                desc:'Tài liệu được mượn nhiều nhất trong tất cả thời gian',
                id:'hot',
                limit:4
            },
        }
    },
    methods: {
        ...mapActions(useBookStore,['fetchBook','fetchFavorite','postFavorite']),
        ...mapActions(useLoanStore,['addToLoan'])
    },
    mounted () {
        this.fetchBook({id:this.$route.params.id});
        !this.user ? '':this.fetchFavorite()
    },
    computed: {
        ...mapState(useBookStore,['book','favorite']),
        ...mapState(useUserStore,['user']),
    },
}
</script>
