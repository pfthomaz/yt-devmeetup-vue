import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert.vue';
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue';
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue';
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue';
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue';

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
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog);
Vue.component('app-meetup-register-dialog', RegisterDialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCWNEvkY0MErTuGrIRyjPdKTNoH1ZOzyTw',
      authDomain: 'devmeetup-e168d.firebaseapp.com',
      databaseURL: 'https://devmeetup-e168d.firebaseio.com',
      projectId: 'devmeetup-e168d',
      storageBucket: 'gs://devmeetup-e168d.appspot.com/'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });
    this.$store.dispatch('loadMeetups');
  }
});
