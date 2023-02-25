<template>
  <h1> Login page</h1>
  <example-component></example-component>
  {{ counter }}
  <vue-button v-on:click="testFunction()"></vue-button>
</template>
<script>
import axios from 'axios';
import {ref} from 'vue';
export default {
  name: "Login",

  setup() {
    const testFunction = () => {
      counter.value = 1;
      axios.get('api/test').then('done');
      counter.value = 2;
    }

    let counter = ref(0);

    return {
      testFunction,
      counter
    }
  }
}
</script>