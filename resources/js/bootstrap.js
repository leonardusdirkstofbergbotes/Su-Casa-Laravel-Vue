import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import {createApp} from 'vue'

import App from '../pages/App.vue'
import router from '../routes/routes'


// components
import VueButton from './components/Button/Button.vue';
import Input from './components/Input/Input.vue';
import Default from './components/Layout/Default/Default.vue';
import Admin from './components/Layout/Admin/Admin.vue';
import Navbar from './components/Navbar/Navbar.vue';
import Form from './components/Form/Form.vue';
import Modal from './components/Modal/Modal.vue';
import Toggle from './components/Toggle/Toggle.vue';
import InputDate from './components/InputDate/InputDate.vue';
import InputTime from './components/InputTime/InputTime.vue';
import InputFile from './components/InputFile/InputFile.vue';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store';

const myCustomLightTheme = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#00a1ff',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    }
  }

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);

app.component('vue-button', VueButton);
app.component('vue-input', Input);
app.component('input-date', InputDate);
app.component('input-time', InputTime);
app.component('input-file', InputFile);
app.component('default-layout', Default);
app.component('admin-layout', Admin);
app.component('navbar', Navbar);
app.component('vue-form', Form);
app.component('modal', Modal);
app.component('toggle', Toggle);

app.mount("#app");
