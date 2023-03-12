<template>
  <div>
    <form @submit.prevent>
      <h4>Post creation</h4>
      <my-input v-focus v-model="post.title" placeholder="name"/>
      <my-input v-model="post.body" placeholder="description"/>
      <my-button style="align-self: flex-end; margin-top: 15px" @click="createPost">Create</my-button>
    </form>
  </div>
</template>

<script>

export default {
  name: "post-form",
  data() {
    return {
      post: {
        id: 0,
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>