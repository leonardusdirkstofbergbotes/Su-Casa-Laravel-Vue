import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "Browse",

    setup() {

        const store = useStore();
        const router = useRouter();

        const categories = ref();

        const logout = () => {
            axios.get('api/auth/login').then(() => {
                localStorage.removeItem('token');
                router.push('/login');
            });
        }

        return {
            categories,
            logout
        }
     }
}
