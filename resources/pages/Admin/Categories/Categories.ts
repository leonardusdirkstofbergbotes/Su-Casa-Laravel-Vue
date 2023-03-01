import { ref } from 'vue';
import Category from '../../../js/models/Category';
export default {
    name: "Categories",

    setup() {
        const categories = ref<Category[]>([]);

        const openForm = () => {
            this.$refs.categoryForm.show = true;
        };

        return {
            categories,
            openForm
        }
    }
}
