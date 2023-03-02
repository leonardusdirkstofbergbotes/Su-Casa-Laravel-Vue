import { createStore } from 'vuex'
import UserDetails from './models/UserDetails';
import { request } from '../js/helper';
import Category from './models/Category';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            userDetails: <UserDetails> {},
            categories: <Category[]> []
        }
    },
    mutations: {
        setUserDetails(state, userDetails: UserDetails) {
            console.log(userDetails);
            state.userDetails = userDetails;
        },
        setCategories(state, categories: Category[]) {
            state.categories = categories;
        }
    },
    actions: {
        fetchCategories ({commit}) {
            request('get', '/api/categories')
                .then(data => {
                    commit('setCategories', data);
                }).catch(error => {
                    commit('setCategories', []);;
                });
        }
    },
    getters: {
        getUserDetails(state) {
            return state.userDetails;
        },
        getCategories (state) {
            return state.categories;
        }
    }
});

export default store;
