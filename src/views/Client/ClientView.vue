<template>
  <div>
    <div ref="content" class="sr-only">Scroll to top</div>
    <TheHeader/>
    <div>
      <router-view></router-view>
    </div>
    <TheFooter/>
    <div class="fixed bottom-2 right-2">
        <button @click="scrollToTop" class="bg-black text-white rounded-full">Top</button>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/client/include/TheHeader.vue";
import TheFooter from '@/components/client/include/TheFooter.vue';

import { ref } from 'vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  setup() {
    const content = ref(null);

    const scrollToTop = () => {
      content.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    return {
      content,
      scrollToTop
    };
  },
};
</script>
