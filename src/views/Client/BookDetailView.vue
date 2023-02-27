<template>
    <TheDetail :key="this.id"/>
</template>
<script>

import TheDetail from '@/components/client/TheDetail.vue';

export default {
    props:['id'],
    components: {  TheDetail },
}
</script>
