import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "AlertBox",

    setup() {
        const store = useStore();

        const alert = computed(() => {
            return store.getters['getAlert'];
        })

        const closeMessage = () => {
            store.commit('setAlert', null);
        };

        return {
            alert,
            closeMessage
        }
    }
}
