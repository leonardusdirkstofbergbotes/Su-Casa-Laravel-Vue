import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import Category from '../../../js/models/Category';
import { request } from '../../../js/helper';
import axios from 'axios';

export default {
    name: "Categories",

    setup() {
        const store = useStore();
        const categories = ref<Category[]>([]);

        const name = ref<string | null>(null);
        const description = ref<string | null>(null);
        const active = ref<boolean>(false);
        const activeUntil = ref<string | null>(null);
        const dailyCutoffTime = ref<string | null>(null);
        const promote = ref<boolean>(false);
        const image = ref<File | null>(null);

        const errors = ref<any[]>([]);
        const categoryForm = ref();

        const openForm = () => {
            categoryForm.value.show = true;
        };

        const closeForm = () => {
            categoryForm.value.show = false;
            resetForm();
        };

        const openCreateForm = () => {
            resetForm();
            openForm();
        };

        const resetForm = () => {
            name.value = null;
            description.value = null;
            active.value = false;
            activeUntil.value = null;
            dailyCutoffTime.value = null;
            promote.value = false;
            image.value = null;
        };

        const save = () => {
            if (validateForm()) {
                const data = {
                    name: name.value,
                    description: description.value,
                    active: active.value,
                    activeUntil: activeUntil.value,
                    dailyCutoffTime: dailyCutoffTime.value,
                    promote: promote.value
                };

                const formData = new FormData();
                formData.append('image', image.value as Blob);
                formData.append('formData', JSON.stringify(data));

                request('post', '/api/categories/create', formData, {
                    'Content-Type': 'multipart/form-data'
                }).then((response: any) => {
                    if (response.data.message == 'success') {
                        categories.value.push(response.data.category);
                        closeForm();
                    }
                }).catch(error => {
                    if (error.response?.data?.type) {
                        if (error.response.data.type == "validation error") {
                            let formattedErrors = [];

                            for (const key in error.response.data.errors) {
                                formattedErrors[key] = error.response.data.errors[key][0];
                            }

                           errors.value = formattedErrors;
                        }
                        else {
                            alert(error.response.data.error);
                        }
                    }
                });
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
