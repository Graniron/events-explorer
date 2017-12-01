import Vue from 'vue';
import * as firebase from 'firebase';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  VProgressCircular,
  transitions,
} from 'vuetify';
import '../node_modules/vuetify/src/stylus/app.styl';

import App from './App';
import router from './router';
import store from './store';
import AlertCmp from './components/shared/Alert';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    VProgressCircular,
    transitions,
  },
  theme: {
    primary: '#4dd0e1',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.config.productionTip = false;
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDXe5Ig4qlLxYMjKy6du4QgQMYSoqnJ608',
      authDomain: 'events-explorer.firebaseapp.com',
      databaseURL: 'https://events-explorer.firebaseio.com',
      projectId: 'events-explorer',
      storageBucket: 'events-explorer.appspot.com',
    });

    this.$store.dispatch('loadEvents');
  },
});
