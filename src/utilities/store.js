import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            homepage: true,
            search: false,
            headerTitle: 'Graphics Engine',
            searchText: ''
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

export default store;
