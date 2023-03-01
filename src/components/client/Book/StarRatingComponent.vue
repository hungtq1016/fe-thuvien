<template>
    <div class="flex items-center text-sm">
        <dt class="flex flex-1 items-center">
            <p class="w-3 font-medium text-gray-900"> {{ this.star }}<span class="sr-only"> star reviews</span > </p>
            <div aria-hidden="true" class="ml-1 flex flex-1 items-center" >
                <StarIcon :class="[ this.countStar > 0 ? 'text-yellow-400' : 'text-gray-300', 'flex-shrink-0 h-5 w-5', ]" aria-hidden="true" />

                <div class="relative ml-3 flex-1">
                    <div class="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    <div v-if="this.countStar> 0" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400" :style="{ width: `calc(${this.countStar} / ${this.countComments} * 100%)`, }" />
                </div>
            </div>
        </dt>
        <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900" >
            {{ this.countComments>0 ? Math.round( (this.countStar / this.countComments) * 100 ) : 0}}%
        </dd>
    </div>
</template>

<script>
import { mapGetters } from 'pinia';
import { useCommentStore } from '@/stores/comment';
import { StarIcon} from "@heroicons/vue/20/solid";

    export default {
        props:['star'],
        components: { StarIcon, },
        methods: {
        },
        computed: {
            ...mapGetters(useCommentStore,['countStar','countComments']),
        },



    }
</script>
