import { PropType, onMounted } from 'vue';
import AlertBoxMessage from '../../models/AlertBoxMessage';
import mitt from 'mitt';

export default {
    name: "AlertBox",

    props: {
        alert: {
            type: Object as PropType<AlertBoxMessage>,
            default: () => {}
        }
    },

    created () {

    },

    setup() {

        document.addEventListener('alertMessage', (data) => {
            console.log(data);
        })
        const emitter = mitt();
        emitter.on('alertMessage', (alertMessage) => {
            console.log(alertMessage);
        })

        onMounted(() => {
            console.log('mounted');

        })

    }
}
