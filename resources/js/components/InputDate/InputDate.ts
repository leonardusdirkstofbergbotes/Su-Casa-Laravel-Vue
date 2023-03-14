import { computed, ref } from 'vue';
export default {
    name: "InputDate",

    props: {
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
      tooltipText: String,
      afterToday: {
        type: Boolean,
        default: false
      },
      beforeToday: {
        type: Boolean,
        default: false
      },
      modelValue: [String, null]
    },

    emits: ['update:modelValue'],

    setup(props) {
        const min = computed(() => {
            if (props.afterToday) return new Date().toISOString().split("T")[0];
            return '';
        });

        const max = computed(() => {
            if (props.beforeToday) return new Date().toISOString().split("T")[0];
            return '';
        });

        return {
            min,
            max
        }
     }
  }
