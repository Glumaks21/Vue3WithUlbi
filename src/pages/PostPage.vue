<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">
      <my-button style="margin: 15px 0" @click="dialogVisible = true">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <h3>List of posts</h3>
    <!--      <post-pager v-model:page="page" :total-page="totalPage"></post-pager>-->
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/>
    <div v-if="isPostLoading">Posts are loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";
import PostPager from "@/components/PostPager.vue";

export default {
  components: {PostPager, MyInput, PostForm, PostList},
  data() {
    return {
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'}
      ],
      searchQuery: '',
      dialogVisible: false,
      isPostLoading: false,
      posts: [],
      page: 0,
      limit: 10,
      totalPage: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    async loadMorePosts() {
      if (this.page !== 0 && this.page >= this.totalPage) {
        return;
      }

      try {
        this.isPostLoading = true;
        this.page++;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log("Error")
      } finally {
        this.isPostLoading = false;
      }
    }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
    // page(newPage) {
    //   this.fetchPosts();
    // }
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