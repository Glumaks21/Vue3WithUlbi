<template>
  <div v-if="posts.length > 0">
    <transition-group name="post-list">
      <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </transition-group>
  </div>
  <h2 v-else style="color : red">
    List is empty
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "post-list",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>