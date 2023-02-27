export default {
  name: "Input",

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
    tooltipText: String
  },

  setup() { }
}
