<template>
    <section>
        <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-16 lg:px-8" >
            <div class="lg:col-span-4">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                    Đánh Giá
                </h2>

                <div class="mt-3 flex items-center">
                    <div>
                        <div class="flex items-center">
                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[ averageRating > rating ? 'text-yellow-400' : 'text-gray-300', 'flex-shrink-0 h-5 w-5', ]" aria-hidden="true" />
                        </div>
                        <p class="sr-only">
                            {{ averageRating }} out of 5 stars
                        </p>
                    </div>
                    <p class="ml-2 text-sm text-gray-900">
                        Trên {{ this.totalComment }} đánh giá
                    </p>
                </div>

                <div class="mt-6">
                    <h3 class="sr-only">Review data</h3>

                    <dl class="space-y-3">
                        <StarRatingComponent v-for="index in 5" :key="index" :star="index"/>
                    </dl>
                </div>

                <div class="mt-10">
                    <h3 class="text-lg font-medium text-gray-900">
                        Viết Bình Luận
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        Viết đánh giá nếu bạn đã từng mượn tài liệu này để mọi người có cái nhìn khách quan nhất.
                    </p>

                    <button type="button" @click="this.openComment = !openComment"
                    class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full" >
                    Viết Bình Luận</button >
                </div>
            </div>

            <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <h3 class="sr-only">Bình Luận Gần Đây</h3>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Bình Luận</label>
                    <form @submit.prevent="submitComment" :class="{'hidden':!openComment}">
                        <div class="py-2">
                            <StarRating v-model="rating" :star-size="20" :rating="this.rating"
                            @update:rating="val=>this.rating=val" :show-rating="false"/>
                        </div>
                        <div class="mt-1 flex rounded-md shadow-sm" >
                            <div class="relative flex flex-grow items-stretch focus-within:z-10">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UsersIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input type="text" title="Bình luận" id="comment" v-model="comment" class="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Viết Bình Luận" />
                            </div>
                            <button type="submit" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <span>Đăng</span>
                            </button>
                        </div>
                    </form>
                  </div>
                <div class="flow-root mt-6">
                    <div class="divide-y divide-sky-100">
                        <div v-for="comment in comments" :key="comment.id" class="py-4" >
                            <div class="flex items-center">
                                <img src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg" :alt="comment.user.name" class="h-12 w-12 rounded-full" />
                                <div class="ml-4">
                                    <h4 class="text-sm font-bold text-gray-900" >
                                        {{ comment.user.email }}
                                    </h4>
                                    <div class="mt-1 flex items-center">
                                        <StarIcon v-for="rating in [ 0, 1, 2, 3, 4, ]" :key="rating" :class="[ comment.rate > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0', ]" aria-hidden="true" />
                                    </div>
                                    <p class="sr-only">
                                        {{ comment.rate }} out of 5 stars
                                    </p>
                                </div>
                            </div>

                            <div class="mt-4 space-y-6 text-base italic text-gray-600">
                                {{comment.comment}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { UsersIcon ,StarIcon} from "@heroicons/vue/20/solid";
import { mapActions, mapGetters, mapState } from 'pinia';
import { useBookStore } from '@/stores/book';
import { useLoadingStore } from '@/stores/loading';
import { useCommentStore } from '@/stores/comment';
import StarRating from 'vue-star-rating'
import StarRatingComponent from "./StarRatingComponent.vue";


export default {
    components: { UsersIcon, StarIcon, StarRating, StarRatingComponent },
    data() {
        return {
            openComment:false,
            comment:null,
            rating:5,
        }
    },
    methods: {
        ...mapActions(useCommentStore,['postComment','fetchComments','setBookId']),
        submitComment(){
            if (this.user == null) {
                alert('can dang nhap')
                return 0
            }
            const payload = {
                comment: this.comment,
                book_id:this.book.id,
                user_id:this.user.id,
                rate:this.rating
            }
            this.setBookId(payload.book_id)
            this.postComment(payload)
        }
    },
    computed: {
        ...mapState(useCommentStore,['comments']),
        ...mapState(useBookStore,['book']),
        ...mapState(useLoadingStore,['user']),
        ...mapGetters(useCommentStore,['averageRating','totalComment'])
    },
    mounted(){
        this.fetchComments({book_id:this.$route.params.id})
    }
}
</script>
