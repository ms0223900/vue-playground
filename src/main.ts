import { createApp } from 'vue';
import App from './App.vue';
import i18n from './locale';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .mount('#app');
