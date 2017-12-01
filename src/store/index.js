import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'https://coworker.imgix.net/pictures/C282/edit/lviv-resize.jpg',
        date: '2017-07-17',
        id: 'dw3de3ee',
        title: 'Events in Lviv',
        location: 'NYC',
        description: 'Its New York',
      },
      {
        imageUrl: 'http://www.dniprohotel.ua/assets/photo/dnipro-hotel/dnipro-hotel-kiev-02.jpg',
        date: '2017-07-19',
        id: 'hsdse3ee',
        title: 'Events in Dnipro',
        location: 'Dnipro',
        description: 'Its Dnipro',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedEvents(state, payload) {
      state.loadedEvents = payload;
    },
    createEvent(state, payload) {
      state.loadedEvents.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadEvents({ commit }) {
      console.log('LOAD EVENTS CALLED');
      commit('setLoading', true);
      firebase.database().ref('events').once('value')
        .then((data) => {
          console.log(data.val());
          const events = [];
          const obj = data.val();
          Object.keys(obj).forEach((key) => {
            console.log(key);
            events.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              date: obj[key].date,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
            });
          });
          console.log(events);
          commit('setLoading', false);
          commit('setLoadedEvents', events);
        })
        .catch((error) => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    createEvent({ commit }, payload) {
      // Reach out to firebase and store it
      firebase.database().ref('events').push(payload)
        .then((data) => {
          console.log(data);
          const key = data.key;
          commit('createEvent', { ...payload, id: key });
        })
        .catch(error => console.error(error));
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const userToSet = {
              id: user.uid,
              registeredEvents: [],
            };
            commit('setUser', userToSet);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
            console.error(error);
          },
        );
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredEvents: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
            console.error(error);
          },
        );
    },
    clearError({ commit }) {
      commit('clearError');
    },

  },
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((eventA, eventB) => eventA.date > eventB);
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return eventId => state.loadedEvents.find(event => event.id === eventId);
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
  },
});

export default store;
