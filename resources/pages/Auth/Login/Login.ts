import axios from 'axios';
import {ref} from 'vue';
export default {
  name: "Login",

  setup() {
    const testFunction = () => {
      counter.value = 1;
      axios.get('api/categories').then((response) => {
        console.log(response);
      });
      counter.value = 2;
    }

    let counter = ref(0);

    return {
      testFunction,
      counter
    }
  }
}
