export default {
    name: "Modal",

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

    setup() {

    }
}
