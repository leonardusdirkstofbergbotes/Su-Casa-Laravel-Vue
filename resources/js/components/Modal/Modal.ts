export default {
    name: "Modal",

    emits: ['closed'],

    props: {
        title: {
            type: String,
            default: 'default title'
        }
    },

    data () {
        const show = false;

        return {
            show
        }
    },

    setup() {}
}
