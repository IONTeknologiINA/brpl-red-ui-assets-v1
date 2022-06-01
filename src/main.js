import {createApp} from 'vue';
import App from './App.vue';
import {createWebHistory, createRouter} from 'vue-router';
import PanjangBerat from "@/PanjangBerat";
import GraphicList from "@/GraphicList";
import {createStore} from "vuex";
import Notifications from '@kyvg/vue3-notification';



const store = createStore({
    state() {
        return {
            homepage: true,
            search: false,
            headerTitle: 'Graphics Engine',
            searchText: '',
        }
    },
    mutations: {
        setHomepage(state, props) {
            state.homepage = props;
        },
        setSearch(state, props) {
            state.search = props;
        },
        setSearchText(state, props) {
            state.searchText = props;
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
            path: '/',
            component: GraphicList
        },
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
application.use(Notifications);

// Register a global custom directive called `v-focus`
application.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

application.mount('#app');
