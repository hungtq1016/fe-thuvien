<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<script>
import { useDark } from '@vueuse/core';
const isDark = useDark();
export default {
  name: 'App',
  watch: {
  $route: {
      immediate: true,
      handler(to, from) {
          document.title = to.meta.title+' | Thư Viện';
      }
  },
}
}
</script>