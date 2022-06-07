import {createApp} from 'vue';
import App from './App.vue';
import {createWebHistory, createRouter} from 'vue-router';
import PanjangBerat from "@/PanjangBerat";
import GraphicList from "@/GraphicList";
import {createStore} from "vuex";
import Notifications from '@kyvg/vue3-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { SetupCalendar } from 'v-calendar';


const store = createStore({
    state() {
        return {
            homepage: true,
            search: false,
            headerTitle: 'Graphics Engine',
            searchText: '',
            host: 'https://a383-103-121-18-20.ap.ngrok.io'
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
application.use(VueAxios, axios);

application.use(SetupCalendar, {});
// application.provide('insertGraphic', (graphicImageName, onSuccess, onFailure) => {
//     console.log('Running google.script.run.insertGraphic() script');
//     google.script.run
//         .withSuccessHandler(onSuccess)
//         .withFailureHandler(onFailure)
//         .insertGraphic(graphicImageName);
// });

// Register a global custom directive called `v-focus`
application.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

application.mount('#app');
