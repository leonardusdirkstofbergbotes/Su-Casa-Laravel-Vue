import { PropType, computed } from 'vue';
import SelectItem from '../../models/SelectItem'

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
        rows: {
            type: String,
            default: "2"
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
        }
      },

      emits: ['update:modelValue'],

    setup(props, {emit}) {
        const itemIsSelected = (value: string) => {
            return props.modelValue.includes(value);
        };

        const toggleItem = (option: SelectItem) => {
            if (props.multiple) {
                console.log(itemIsUnique(option.value));
                if (itemIsUnique(option.value)) emit('update:modelValue', [...props.modelValue, option.value]);
                else {
                    const removedItemArray = props.modelValue.filter((item) => {
                        return item != option.value;
                    });

                    emit('update:modelValue', removedItemArray);
                }

            }
            else emit('update:modelValue', option.value);
        };

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

        return {
            toggleItem,
            getLabel,
            itemIsSelected
        }
    }
}
