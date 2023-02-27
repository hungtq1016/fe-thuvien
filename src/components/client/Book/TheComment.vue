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
                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[ reviews.average > rating ? 'text-yellow-400' : 'text-gray-300', 'flex-shrink-0 h-5 w-5', ]" aria-hidden="true" />
                        </div>
                        <p class="sr-only">
                            {{ reviews.average }} out of 5 stars
                        </p>
                    </div>
                    <p class="ml-2 text-sm text-gray-900">
                        Trên {{ reviews.totalCount }} đánh giá
                    </p>
                </div>

                <div class="mt-6">
                    <h3 class="sr-only">Review data</h3>

                    <dl class="space-y-3">
                        <div v-for="count in reviews.counts" :key="count.rating" class="flex items-center text-sm" >
                            <dt class="flex flex-1 items-center">
                                <p class="w-3 font-medium text-gray-900"> {{ count.rating }}<span class="sr-only"> star reviews</span > </p>
                                <div aria-hidden="true" class="ml-1 flex flex-1 items-center" >
                                    <StarIcon :class="[ count.count > 0 ? 'text-yellow-400' : 'text-gray-300', 'flex-shrink-0 h-5 w-5', ]" aria-hidden="true" />

                                    <div class="relative ml-3 flex-1">
                                        <div class="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                        <div v-if="count.count > 0" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400" :style="{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)`, }" />
                                    </div>
                                </div>
                            </dt>
                            <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900" >
                                {{ Math.round( (count.count / reviews.totalCount) * 100 ) }}%
                            </dd>
                        </div>
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
                    <form @submit.prevent="submitComment">
                        <div class="mt-1 flex rounded-md shadow-sm" :class="{'hidden':!openComment}">
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
                        <div v-for="comment in book.comments" :key="comment.id" class="py-4" >
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
import { mapActions, mapState } from 'pinia';
import { useBookStore } from '@/stores/book';
import { useLoadingStore } from '@/stores/loading';
import { useCommentStore } from '@/stores/comment';

export default {
    components: { UsersIcon,StarIcon },
    data() {
        return {
            openComment:false,
            comment:null,
            reviews : {
                average: 4,
                totalCount: 1624,
                counts: [
                { rating: 5, count: 1019 },
                { rating: 4, count: 162 },
                { rating: 3, count: 97 },
                { rating: 2, count: 199 },
                { rating: 1, count: 147 },
                ],
                featured: [
                {
                    id: 1,
                    rating: 5,
                    content: `
                    <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
                    `,
                    author: 'Emily Selman',
                    avatarSrc:
                    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
                },
                // More reviews...
                ],
            }
        }
    },
    methods: {
        ...mapActions(useCommentStore,['postComment']),
        submitComment(){
            if (this.user == null) {
                alert('can dang nhap')
                return 0
            }
            const payload = {
                comment: this.comment,
                book_id:this.book.id,
                user_id:this.user.id,
                rate:5
            }
            this.postComment(payload)
        }
    },
    computed: {
        ...mapState(useBookStore,['book']),
        ...mapState(useLoadingStore,['user'])
    },
}
</script>
