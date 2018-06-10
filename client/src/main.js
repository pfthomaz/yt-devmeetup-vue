import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert.vue';

// import colors from 'vuetify/es5/util/colors';

// Vue.use(Vuetify, {
//   theme: {
//     primary: colors.purple.base,
//     secondary: colors.grey.darken1,
//     accent: colors.shades.black,
//     error: colors.red.accent3
//   }
// });

Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    AlertCmp
  },
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCWNEvkY0MErTuGrIRyjPdKTNoH1ZOzyTw',
      authDomain: 'devmeetup-e168d.firebaseapp.com',
      databaseURL: 'https://devmeetup-e168d.firebaseio.com',
      projectId: 'devmeetup-e168d',
      storageBucket: 'devmeetup-e168d.appspot.com'
    });
  }
});
