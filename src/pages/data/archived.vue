<template>
  <div>
     <common-unfiled :searchType="2" :upload="1" :batchStatus="0"></common-unfiled>
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


