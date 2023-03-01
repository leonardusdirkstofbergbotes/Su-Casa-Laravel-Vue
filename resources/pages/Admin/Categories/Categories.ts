import { useStore } from 'vuex';
import { ref } from 'vue';
import Category from '../../../js/models/Category';

export default {
    name: "Categories",

    setup() {
        const store = useStore();
        const categories = ref<Category[]>([]);

        const name = ref<string>('');
        const description = ref<string>('');
        const active = ref<string>(''); // TODO: this should be boolean that is linked to a toggle switch
        const activeUntil = ref<string>('');
        const dailyCutoffTime = ref<string>('');
        const promote = ref<string>(''); // TODO: this should be boolean that is linked to a toggle switch
        const image = ref<File | null>();

        const errors = ref<any[]>([]);
        const categoryForm = ref();

        const openForm = () => {
            categoryForm.value.show = true;
        };

        const closeForm = () => {
            categoryForm.value.show = false;
        };

        const openCreateForm = () => {
            resetForm();
            openForm();
        };

        const resetForm = () => {
            name.value = '';
            description.value = '';
            active.value = '';
            activeUntil.value = '';
            dailyCutoffTime.value = '';
            promote.value = '';
            image.value = null;
        };

        return {
            categories,
            name,
            description,
            active,
            activeUntil,
            dailyCutoffTime,
            promote,
            image,
            errors,
            categoryForm,
            openCreateForm,
            closeForm
        }
    }
}
