import axios from "axios";
import UserDetails from "../models/UserDetails";

export const userModule = {
    state() {
        return {
            user: <UserDetails> {}
        }
    },
    mutations: {
        setUser(state, userDetails: UserDetails) {
            state.user = userDetails;
        }
    },
    actions: {
        loginUser ({commit}, userDetails: UserDetails) {

            let token = '';

            const dataToSave = Object.keys(userDetails)
                .filter((key) => {
                    if (key == 'token') {
                        token = userDetails[key];
                        return false;
                    }
                    return true;
                })
                .reduce((obj, key) => {
                    return Object.assign(obj, {
                        [key]: userDetails[key]
                    });
                }, {})
            ;

            localStorage.setItem('token', token);
            localStorage.setItem('uid', userDetails.id.toString());

            commit('setUser', dataToSave);
            return;
        },

        logoutUser({commit}) {
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            commit('setUser', {});
        },

        refreshToken ({commit}, configSettings: any) {
            return new Promise(async (resolve, reject) => {
                await axios.get('/api/auth/refresh', configSettings).
                    then(async (response) => {
                        if (response.data.status == 'success') {
                            localStorage.setItem('token', response.data.token);

                            resolve(response.data.token);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        }
    },
    getters: {
        getUser (state) {
            return state.user;
        }
    }
}
