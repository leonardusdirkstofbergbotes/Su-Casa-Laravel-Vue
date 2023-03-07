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
      modelValue: [String, null]
    },

    emits: ['update:modelValue'],

    setup() { }
  }
