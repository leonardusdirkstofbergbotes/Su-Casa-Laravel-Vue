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
        },
        addCategory (state, category: Category) {
            state.categories.push(category);
        },
        updateCategory (state, updatedCategory: Category) {
            const updatedCategoryRemoved = state.categories.filter((category: Category) => {
                return category.id.toString() != updatedCategory.id.toString();
            });

            updatedCategoryRemoved.push(updatedCategory);
            state.categories = updatedCategoryRemoved;
        },
        removeCategory (state, id: string) {
            state.categories = state.categories.filter((category: Category) => {
                return category.id.toString() != id;
            });
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
        },

        deleteCategory ({commit}, id: string) {
            request('delete', `/api/categories/delete/${id}`)
                .then(() => {
                    this.commit('removeCategory', id);
                })
                .catch(error => {
                    console.log(error);
                })
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
