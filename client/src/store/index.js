import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [{
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/800px-New_york_times_square-terabass.jpg',
      id: 'afajfjadfaadfa323',
      title: 'Meetup in New York',
      date: new Date(),
      location: 'New York',
      description: 'Awesome!'
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg/800px-Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
      id: 'aadsfhbkhlk1241',
      title: 'Meetup in Paris',
      date: new Date(),
      location: 'Paris',
      description: 'Voila!'
    }
      // { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg', id: 'afajfjadfaadfa323', title: 'Meetup in New York' },
      // { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg', id: 'aadsfhbkhlk1241', title: 'Meetup in Paris' }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser (state, payload) {
      state.user = payload;
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '12h1049h130qwpu'
      };
      // reach out to  firebase and store it
      commit('createMeetup', meetup);
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              registeredMeetups: []
            };
            commit('setUser', newUser);
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        );
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          };
          commit('setUser', newUser);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
    }
  },
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
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },
    user (state) {
      return state.user;
    }
  }
});
