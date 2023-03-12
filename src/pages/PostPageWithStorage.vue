<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus
              :model-value="searchQuery"
              @update:model-value="setSearchQuery"
              placeholder="Search...">
    </my-input>
    <div class="app__btns">
      <my-button style="margin: 15px 0"
                 @click="dialogVisible = true">
        Create post
      </my-button>
      <my-select :model-value="selectedSort"
                 @update:model-value="setSelectedSort"
                 :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <h3>List of posts</h3>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/>
    <div v-if="isPostLoading">Posts are loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import PostPager from "@/components/PostPager.vue";
import MyButton from "@/components/UI/MyButton.vue";
import {mapActions, mapMutations, mapGetters, mapState} from 'vuex';

export default {
  components: {MyButton, PostPager, MyInput, PostForm, PostList},
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
  },
  computed: {
    ...mapState({
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      isPostLoading: state => state.post.isPostLoading,
      posts: state => state.post.posts,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPage: state => state.post.totalPage
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  background: green;
}
</style>