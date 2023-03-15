import { useStore } from 'vuex';
import { computed, ref, watch, onMounted } from 'vue';
import Food from '../../../js/models/Meal';
import Category from '../../../js/models/Category';

export default {
    name: "Food",

    setup() {
        const store = useStore();

        const name = ref<string | null>(null);
        const description = ref<string | null>(null);
        const active = ref<boolean>(false);
        const activeUntil = ref<string | null>(null);
        const dailyCutoffTime = ref<string | null>(null);
        const promote = ref<boolean>(false);
        const eta = ref<string | null>(null);
        const price = ref<string | null>(null);
        const bulkBuyDiscount = ref<number | null>(null);
        const bulkBuyPortions = ref<number | null>(null);
        const imagePath = ref<string | null>(null);
        const image = ref<File | null>(null);
        const errors = ref<any[]>([]);
        const foodForm = ref();
        const tempMealId = ref<string | null>(null);
        const categoryIds = ref<string[]>([]);

        const meals = computed(() => {
            return store.getters['getMeals'];
        });

        const activeCategories = computed(() => {
            return store.getters['getActiveCategories'];
        });

        const categoryOptions = computed(() => {
            return activeCategories.value.map((category: Category) => {
                return {
                    label: category.name,
                    value: category.id
                }
            });
        });

        const openForm = () => {
            foodForm.value.show = true;
        };

        const closeForm = () => {
            foodForm.value.show = false;
            resetForm();
        };

        const resetForm = () => {
            name.value = null;
            description.value = null;
            active.value = false;
            activeUntil.value = null;
            dailyCutoffTime.value = null;
            promote.value = false;
            image.value = null;
            imagePath.value = null;
            eta.value = null;
            price.value = null;
            bulkBuyDiscount.value = null;
            bulkBuyPortions.value = null;

            tempMealId.value = null;
        };

        // TODO:
        const deleteMeal = (id: string) => {
            store.dispatch('deleteMeal', id)
                .then(() => {
                    store.dispatch('showSuccess', 'Meal has been deleted successfully');
                })
            ;
        };

        const editMeal = (food: Food) => {
            name.value = food.name;
            description.value = food.description;
            active.value = food.active;
            activeUntil.value = food.activeUntil;
            dailyCutoffTime.value = food.dailyCutoffTime;
            promote.value = food.promote;
            imagePath.value = food.imagePath;
            eta. value = food.eta;
            price. value = food.price;
            bulkBuyDiscount. value = food.bulkBuyDiscount;
            bulkBuyPortions. value = food.bulkBuyPortions;

            tempMealId.value = food.id.toString();
            openForm();
        };

        // TODO:
        const save = () => {
            if (validateForm()) {
                const formData = getInputData();

                store.dispatch('createMeal', formData)
                .then(() => {
                    store.dispatch('showSuccess', 'Meal has been created successfully');
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

        // TODO:
        const updateMeal = () => {
            if (validateForm()) {
                const formData = getInputData();

                store.dispatch('updateMeal', {inputData: formData, categoryId: tempMealId.value})
                    .then(() => {
                        store.dispatch('showSuccess', 'Meal has been updated successfully');
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
                formattedErrors['image'] = 'Please add a image for this food item';
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
            if ((bulkBuyPortions.value != undefined || bulkBuyPortions.value != null) && (bulkBuyDiscount.value == undefined || bulkBuyDiscount.value == null)) {
                formattedErrors['bulkBuyDiscount'] = 'Please enter the discount amount';
                isFormValid = false;
            }
            if (categoryIds.value.length == 0) {
                formattedErrors['categoryIds'] = 'Please pick at least 1 category';
                isFormValid = false;
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

        watch(bulkBuyPortions, (portions: number | null) => {
            if (portions == 0) bulkBuyDiscount.value = null;
        });

        const getInputData = (): FormData => {
            const data = {
                name: name.value,
                description: description.value,
                active: active.value,
                activeUntil: activeUntil.value,
                dailyCutoffTime: dailyCutoffTime.value,
                promote: promote.value,
                eta: eta.value,
                price: price.value,
                bulkBuyDiscount: bulkBuyDiscount.value,
                bulkBuyPortions: bulkBuyPortions.value
            };

            const formData = new FormData();
            formData.append('image', image.value as Blob);
            formData.append('formData', JSON.stringify(data));

            return formData;
        };

        // TODO:
        onMounted(() => {
            store.dispatch('fetchCategories');
            store.dispatch('fetchMeals');
        });

        return {
            meals,
            categoryOptions,
            name,
            description,
            active,
            activeUntil,
            dailyCutoffTime,
            categoryIds,
            promote,
            imagePath,
            image,
            eta,
            price,
            bulkBuyDiscount,
            bulkBuyPortions,
            errors,
            foodForm,
            openForm,
            closeForm,
            save,
            deleteMeal,
            editMeal,
            updateMeal,
            tempMealId,
            resetForm
        }
    }
}
