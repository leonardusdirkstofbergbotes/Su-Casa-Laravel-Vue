export default {
    name: "Toggle",

    props: {
        required: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        modelValue: [Boolean, Number]
      },

      emits: ['update:modelValue'],

    setup() {}
}
