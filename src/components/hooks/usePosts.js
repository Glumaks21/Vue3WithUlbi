import axios from "axios";
import {onMounted, ref} from 'vue';

export function usePosts(limit) {
    const posts = ref([]);
    const page = ref(0);
    const totalPage = ref(1);
    const isPostsLoading = ref(true);

    const fetching = async () => {
        if (page.value >= totalPage.value) {
            return;
        }

        try {
            page.value++;

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPage.value = Math.ceil(response.headers['x-total-count'] / limit);
            posts.value = [...posts.value, ...response.data];
        } catch (e) {
            alert("Error")
        } finally {
            isPostsLoading.value = false;
        }
    }

    onMounted(fetching);

    return {
        posts, isPostsLoading, page, totalPage, fetching
    }
}