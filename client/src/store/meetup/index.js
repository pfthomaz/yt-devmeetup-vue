import * as firebase from 'firebase';

export default {
  state: {
    loadedMeetups: [
      {
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
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup (state, payload) {
      const updatedMeetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        updatedMeetup.title = payload.title;
      }
      if (payload.description) {
        updatedMeetup.description = payload.description;
      }
      if (payload.date) {
        updatedMeetup.date = payload.date;
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then(
          (data) => {
            const meetups = [];
            const obj = data.val();
            for (let key in obj) {
              meetups.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                location: obj[key].location,
                date: obj[key].date,
                creatorId: obj[key].creatorId
              });
            }
            commit('setLoadedMeetups', meetups);
            commit('setLoading', false);
          }
        )
        .catch(
          (error) => {
            console.log(error);
            commit('setLoading', false);
          }
        );
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      };
      // Reach out to  firebase and store it
      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image);
        })
        .then(fileData => {
          console.log('fileData is: ', fileData);
          return fileData.ref.getDownloadURL();
        })
        .then(url => {
          imageUrl = url;
          console.log('File available at', imageUrl);
          return firebase.database().ref('meetups').child(key).update({imageUrl: url});
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetup', payload);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetUpA, meetUpB) => {
        return meetUpA.date > meetUpB.date;
      });
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 6);
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    }
  }
};
