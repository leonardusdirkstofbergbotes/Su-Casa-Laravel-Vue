import { AlertType } from './../enums/AlertTypes';
import { AlertBoxMessage } from "../models/AlertBoxMessage";

export const alertModule = {
    state() {
        return {
            alert: <AlertBoxMessage | null> null
        }
    },
    mutations: {
        setAlert(state, alertDetails: AlertBoxMessage) {
            state.alert = alertDetails;
        }
    },
    actions: {
        showSuccess({commit, dispatch}, message: string) {
            commit('setAlert', {
                message: message,
                type: AlertType.SUCCESS
            });

            dispatch('autoHide');
        },

        showError({commit, dispatch}, message: string) {
            commit('setAlert', {
                message: message,
                type: AlertType.ERROR
            });

            dispatch('autoHide');
        },

        showInfo({commit, dispatch}, message: string) {
            commit('setAlert', {
                message: message,
                type: AlertType.INFO
            });

            dispatch('autoHide');
        },

        autoHide({commit}) {
            setTimeout(() => {
                commit('setAlert', null);
            }, 3500);
        }
    },
    getters: {
        getAlert (state) {
            return state.alert;
        }
    }
}
