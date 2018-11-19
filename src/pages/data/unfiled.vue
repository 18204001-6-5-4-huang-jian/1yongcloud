<template>
  <div>
     <common-unfiled :searchType="2" :upload="2" :batchStatus="1"></common-unfiled>
  </div>
</template>

<script>
  import commonUnfiled from './commonUnfiled.vue'
  export default {
    components: {
       commonUnfiled
    },
  }
</script>

