import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import Category from '../../../js/models/Category';

export default {
    name: "Categories",

    setup() {
        const store = useStore();
        const categories = ref<Category[]>([]);

        const name = ref<string>('');
        const description = ref<string>('');
        const active = ref<boolean>(false);
        const activeUntil = ref<string>('');
        const dailyCutoffTime = ref<string>('');
        const promote = ref<boolean>(false);
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
            active.value = false;
            activeUntil.value = '';
            dailyCutoffTime.value = '';
            promote.value = false;
            image.value = null;
        };

        const save = () => {
            if (validateForm()) {
                alert('form valid');
            }
        };

        const validateForm = (): boolean => {
            let formattedErrors = [];
            let isFormValid = true;

            if (name.value == undefined || name.value == '') {
                formattedErrors['name'] = 'Please enter a name';
                isFormValid = false;
            }
            if (description.value == undefined || description.value == '') {
                formattedErrors['description'] = 'Please enter a description';
                isFormValid = false;
            }
            if (image.value == undefined || image.value == null) {
                formattedErrors['image'] = 'Please add a image for this category';
                isFormValid = false;
            }
            if (activeUntil.value != undefined && activeUntil.value != null) {
                const todaysDate = new Date();
                const isDateInPast = new Date(activeUntil.value) < todaysDate;

                if (isDateInPast) {
                    formattedErrors['activeUntil'] = 'This date cannot be in the past';
                    isFormValid = false;
                }
            }

            errors.value = formattedErrors;
            return isFormValid;
        };

        watch(promote, (shouldPromote: boolean) => {
            if (!shouldPromote) dailyCutoffTime.value = '';
        });

        watch(active, (shouldActivate: boolean) => {
            if (!shouldActivate) activeUntil.value = '';
        });

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
            closeForm,
            save
        }
    }
}
