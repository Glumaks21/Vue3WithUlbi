import Main from "@/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router"
import PostPage from "@/pages/PostPage.vue";
import About from "@/pages/About.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPageWithStorage from "@/pages/PostPageWithStorage.vue";
import PostCompostionApi from "@/pages/PostCompostionApi.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStorage
    },
    {
        path: '/composition',
        component: PostCompostionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
