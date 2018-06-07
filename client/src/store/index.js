import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/800px-New_york_times_square-terabass.jpg',
      id: 'afajfjadfaadfa323',
      title: 'Meetup in New York',
      date: '2018-07-17'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg/800px-Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
      id: 'aadsfhbkhlk1241',
      title: 'Meetup in Paris',
      date: '2018-07-18'
    }
      // { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg', id: 'afajfjadfaadfa323', title: 'Meetup in New York' },
      // { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg', id: 'aadsfhbkhlk1241', title: 'Meetup in Paris' }
    ],
    user: {
      id: 'awsdawofa1234',
      registeredMeetups: ['afajfjadfaadfa323']
    }
  },
  mutations: {},
  actions: {},
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetUpA, meetUpB) => {
        return meetUpA.date > meetUpB.date;
      });
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup (state) {
      return (meetupId) => {
        console.log('meetupId is ' + meetupId + ' and of type ' + typeof (meetupId));
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    }
  }
});
