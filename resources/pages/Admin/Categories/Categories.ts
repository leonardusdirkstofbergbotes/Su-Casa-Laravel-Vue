import { useStore } from 'vuex';
import { computed, ref, watch, onMounted } from 'vue';
import Category from '../../../js/models/Category';

export default {
    name: "Categories",

    setup() {
        const store = useStore();

        const name = ref<string | null>(null);
        const description = ref<string | null>(null);
        const active = ref<boolean>(true);
        const activeUntil = ref<string | null>(null);
        const dailyCutoffTime = ref<string | null>(null);
        const promote = ref<boolean>(false);
        const imagePath = ref<string | null>(null);
        const image = ref<File | null>(null);

        const errors = ref<any[]>([]);
        const categoryForm = ref();
        const tempCategoryId = ref<string | null>(null);

        const categories = computed(() => {
            return store.getters['getCategories'];
        })

        const openForm = () => {
            categoryForm.value.show = true;
        };

        const closeForm = () => {
            categoryForm.value.show = false;
            resetForm();
        };

        const resetForm = () => {
            name.value = null;
            description.value = null;
            active.value = true;
            activeUntil.value = null;
            dailyCutoffTime.value = null;
            promote.value = false;
            image.value = null;
            imagePath.value = null;

            tempCategoryId.value = null;
        };

        const deleteCategory = (id: string) => {
            store.dispatch('deleteCategory', id)
                .then(() => {
                    store.dispatch('showSuccess', 'Category has been deleted successfully');
                })
            ;
        };

        const editCategory = (category: Category) => {
            name.value = category.name;
            description.value = category.description;
            active.value = category.active;
            activeUntil.value = category.activeUntil;
            dailyCutoffTime.value = category.dailyCutoffTime;
            promote.value = category.promote;
            imagePath.value = category.imagePath;

            tempCategoryId.value = category.id.toString();
            openForm();
        };

        const save = () => {
            if (validateForm()) {
                const formData = getInputData();

                store.dispatch('createCategory', formData)
                .then(() => {
                    store.dispatch('showSuccess', 'Category has been created successfully');
                    closeForm();
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

        const updateCategory = () => {
            if (validateForm()) {
                const formData = getInputData();

                store.dispatch('updateCategory', {inputData: formData, categoryId: tempCategoryId.value})
                    .then(() => {
                        store.dispatch('showSuccess', 'Category has been updated successfully');
                        closeForm();
                    }).catch(error => {
                        console.log(error);
                    })
                ;
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

        const getInputData = (): FormData => {
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

            return formData;
        };

        onMounted(() => {
            store.dispatch('fetchCategories');
        });

        return {
            categories,
            name,
            description,
            active,
            activeUntil,
            dailyCutoffTime,
            promote,
            imagePath,
            image,
            errors,
            categoryForm,
            openForm,
            closeForm,
            save,
            deleteCategory,
            editCategory,
            updateCategory,
            tempCategoryId,
            resetForm
        }
    }
}
