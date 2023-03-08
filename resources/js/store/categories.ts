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
            return new Promise((resolve, reject) => {
                request('get', '/api/categories')
                    .then((response: any) => {
                        commit('setCategories', response.data);
                        resolve(true);
                    }).catch(error => {
                        commit('setCategories', []);
                        reject(error);
                    });
            });
        },

        createCategory ({commit}, inputData) {
            return new Promise((resolve, reject) =>{
                request('post', '/api/categories/create', inputData, {'Content-Type': 'multipart/form-data'})
                    .then((response: any) => {
                        if (response.data.message == 'success') {
                            commit('addCategory', response.data.category);
                            resolve(true);
                        }
                    }).catch(error => {
                        reject(error);
                    });
            });

        },

        updateCategory ({state, commit}, {inputData, categoryId}) {
            console.log('category 2');
            return new Promise((resolve, reject) => {
                request('post', `/api/categories/update/${categoryId}`, inputData)
                    .then((response: any) => {
                        if (response.data.message == 'success') {
                            const updatedCategory = response.data.category;

                            const updatedCategoryRemoved = state.categories.filter((category: Category) => {
                                return category.id.toString() != updatedCategory.id.toString();
                            });

                            updatedCategoryRemoved.push(updatedCategory);
                            commit('setCategories', updatedCategoryRemoved);
                            resolve(true);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
                ;
            });
        },

        deleteCategory ({commit}, id: string) {
            return new Promise((resolve, reject) => {
                request('delete', `/api/categories/delete/${id}`)
                .then(() => {
                    commit('removeCategory', id);
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })
            });
        }
    },
    getters: {
        getCategories (state) {
            return state.categories.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1;
                return 0;
            });
        }
    }
}
