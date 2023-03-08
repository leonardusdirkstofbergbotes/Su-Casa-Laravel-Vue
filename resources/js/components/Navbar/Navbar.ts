import { PropType } from "vue";
import MenuItem from "../../models/MenuItem";

export default {
    name: "Navbar",

    props: {
        menuItems: Object as PropType<MenuItem[]>,
        default: () => []
    },

    setup() { }
}
