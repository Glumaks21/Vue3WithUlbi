import axios from "axios";

export default {
    state: () => ({
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By description'}
        ],
        searchQuery: '',
        isPostLoading: false,
        posts: [],
        page: 0,
        limit: 10,
        totalPage: 1
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSortOptions(state, sortOptions) {
            state.sortOptions = sortOptions;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setLoading(state, loading) {
            state.isPostLoading = loading;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPage(state, page) {
            state.page = page;
        },
        setLimit(state, limit) {
            state.limit = limit;
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage;
        },
    },
    actions: {
        async loadMorePosts({state, commit}) {
            if (state.page >= state.totalPage) {
                return;
            }

            try {
                commit('setLoading', true);
                commit('setPage', state.page + 1);

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log("Error")
            } finally {
                commit('setLoading', false);
            }
        }
    },
    namespaced: true
}