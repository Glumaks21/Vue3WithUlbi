<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">
      <my-button style="margin: 15px 0" @click="dialogVisible = true">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
    </my-dialog>
    <h3>List of posts</h3>
    <post-list :posts="searchedPosts"/>
    <div v-if="isPostLoading">Posts are loading...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import PostPager from "@/components/PostPager.vue";
import {usePosts} from "@/components/hooks/usePosts";
import {useSortedPosts} from "@/components/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/components/hooks/useSortedAndSearchedPosts";

export default {
  components: {PostPager, MyInput, PostForm, PostList},
  data() {
    return {
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'}
      ],
      dialogVisible: false
    }
  },
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchQuery, searchedPosts} = useSortedAndSearchedPosts(posts);

    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      searchedPosts
    }
  },
}
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>