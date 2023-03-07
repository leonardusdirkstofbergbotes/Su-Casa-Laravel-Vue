import { request } from "../helper";
import Category from "../models/Category";

export const categoriesModule = {
    state() {
        return {
            categories: <Category[]> []
        }
    },
    mutations: {
        setCategories(state, categories: Category[]) {
            console.log(categories);
            state.categories = categories;
        },
        addCategory (state, category: Category) {
            state.categories.push(category);
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
                .then(response => {
                    commit('setCategories', response.data);
                }).catch(error => {
                    commit('setCategories', []);;
                });
        },

        updateCategory ({state, commit}, updatedCategory: Category) {
            const updatedCategoryRemoved = state.categories.filter((category: Category) => {
                return category.id.toString() != updatedCategory.id.toString();
            });

            updatedCategoryRemoved.push(updatedCategory);

            commit('setCategories', updatedCategoryRemoved);
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
}
