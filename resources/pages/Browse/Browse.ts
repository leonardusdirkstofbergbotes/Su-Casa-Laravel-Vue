import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Browse",

    setup() {

        const store = useStore();
        const test = store.state.count;

        const categories = ref();

        return {
            categories,
            test
        }
     }
}
