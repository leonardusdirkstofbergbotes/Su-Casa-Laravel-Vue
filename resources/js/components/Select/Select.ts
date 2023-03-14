import { PropType, ref } from 'vue';
import SelectItem from '../../models/SelectItem';
import { onClickOutside } from '@vueuse/core';

export default {
    name: "Select",

    props: {
        type: {
            type: String,
            default: 'text'
        },
        required: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object as PropType<SelectItem[]>,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        tooltipText: String,
        modelValue: {
            type:  Object as PropType<String[]>
        },
      },

      emits: ['update:modelValue'],

    setup(props, {emit}) {
        const selectWrapper = ref(null);
        const showDropdown = ref<boolean>(false);

        const itemIsSelected = (value: string) => {
            return props.modelValue.includes(value);
        };

        const toggleItem = (option: SelectItem) => {
            if (props.multiple) {
                console.log(itemIsUnique(option.value));
                if (itemIsUnique(option.value)) emit('update:modelValue', [...props.modelValue, option.value]);
                else removeItem(option.value);
            }
            else {
                emit('update:modelValue', option.value);
                showDropdown.value = false;
            }
        };

        const removeItem = (value: string) => {
            const removedItemArray = props.modelValue.filter((item) => {
                return item != value;
            });

            emit('update:modelValue', removedItemArray);
        }

        const getLabel = (value: string) => {
            const mathcedOption = props.options.find((option: SelectItem) => {
                return option.value == value;
            });

            if (mathcedOption) return mathcedOption.label;
            return '';
        };

        const itemIsUnique = (value: string) => {
            const itemsMatched = props.modelValue.filter((item: string) => {
                return item == value;
            });

            return itemsMatched.length == 0;
        };

        const determinePosition = (element: Element) => {
            if (element.tagName === "DIV") {
                if (showDropdown.value == true) showDropdown.value = false;
                else {
                    // TODO: get position of input and check if enough space is available to render the dropdown as normal ELSE render on top
                    showDropdown.value = true;
                }
            }
        };

        onClickOutside (selectWrapper, (event) => {
            showDropdown.value = false;
        })

        return {
            selectWrapper,
            showDropdown,
            toggleItem,
            getLabel,
            itemIsSelected,
            removeItem,
            determinePosition
        }
    }
}
