import { request } from "../helper";
import Meal from "../models/Meal";

export const mealsModule = {
    state() {
        return {
            meals: <Meal[]> []
        }
    },
    mutations: {
        setMeals(state, meals: Meal[]) {
            state.meals = meals;
        },
        addMeal (state, meal: Meal) {
            state.meals.push(meal);
        },
        removeMeal (state, id: string) {
            state.meals = state.meals.filter((meal: Meal) => {
                return meal.id.toString() != id;
            });
        }
    },
    actions: {
        fetchMeals ({commit}) {
            return new Promise((resolve, reject) => {
                request('get', '/api/meals')
                    .then((response: any) => {
                        commit('setMeals', response.data);
                        resolve(true);
                    }).catch(error => {
                        commit('setMeals', []);
                        reject(error);
                    });
            });
        },

        createMeal ({commit}, inputData) {
            return new Promise((resolve, reject) =>{
                request('post', '/api/meals/create', inputData, {'Content-Type': 'multipart/form-data'})
                    .then((response: any) => {
                        if (response.data.message == 'success') {
                            commit('addMeal', response.data.meal);
                            resolve(true);
                        }
                    }).catch(error => {
                        reject(error);
                    });
            });

        },

        updateMeal ({state, commit}, {inputData, mealId}) {
            return new Promise((resolve, reject) => {
                request('post', `/api/meals/update/${mealId}`, inputData)
                    .then((response: any) => {
                        if (response.data.message == 'success') {
                            const updatedMeal = response.data.meal;

                            const updatedMealRemoved = state.meals.filter((meal: Meal) => {
                                return meal.id.toString() != updatedMeal.id.toString();
                            });

                            updatedMealRemoved.push(updatedMeal);
                            commit('setMeals', updatedMealRemoved);
                            resolve(true);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
                ;
            });
        },

        deleteMeal ({commit}, id: string) {
            return new Promise((resolve, reject) => {
                request('delete', `/api/meals/delete/${id}`)
                .then(() => {
                    commit('removeMeal', id);
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })
            });
        }
    },
    getters: {
        getMeals (state) {
            return state.meals.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1;
                return 0;
            });
        }
    }
}
