import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import store from "./store/index";
import VueCookies from 'vue-cookies';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import './assets/main.css';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)

app.use(createPinia()).use(VueCookies).use(store)
app.use(router).component('EasyDataTable', Vue3EasyDataTable)

app.mount('#app')
