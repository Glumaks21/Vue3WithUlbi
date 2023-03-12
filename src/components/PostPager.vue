<template>
  <div class="page__wrapper">
    <div class="page" v-for="pageNumber in totalPage" :class="{
        'current_page': this.page === pageNumber
      }" @click="$emit('update:page', pageNumber)">{{ pageNumber }}</div>
  </div>
</template>

<script>
export default {
  name: 'post-pager',
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current_page {
  border: 2px solid teal;
}
</style>