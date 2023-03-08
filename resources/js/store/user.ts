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
        }
    },
    getters: {
        getUser (state) {
            return state.user;
        }
    }
}
