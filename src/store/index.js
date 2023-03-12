import {createStore} from "vuex";
import PostModule from "@/store/postModule";

export default createStore({
    modules: {
        post: PostModule
    }
});