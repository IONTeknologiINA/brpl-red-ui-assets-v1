import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory ,createRouter } from 'vue-router';
import PanjangBerat from "@/PanjangBerat";
import GraphicList from "@/GraphicList";
import { createStore } from "vuex";


const store = createStore({
    state() {
        return {
            homepage: true,
            search: false,
            headerTitle: 'Graphics Engine'
        }
    },
    mutations: {
        setHomepage(state, props) {
            state.homepage = props;
        },
        setSearch(state, props) {
            state.search = props;
        },
        setHeaderTitle(state, props) {
            state.headerTitle = props;
        },
    }
});

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/userCodeAppPanel',
            component: GraphicList
        },
        {
            path: '/panjang-berat',
            component: PanjangBerat
        }
    ]
});

const application = createApp(App);

application.use(router);
application.use(store);
application.mount('#app');
