import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            homepage: true,
            loading: false,
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
        setLoading(state, props) {
            state.loading = props;
        },
    }
});

export default store;
