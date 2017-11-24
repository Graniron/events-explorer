import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedEvents: [
      {
        imageUrl: 'https://coworker.imgix.net/pictures/C282/edit/lviv-resize.jpg',
        date: '2017-07-17',
        id: 'dw3de3ee',
        title: 'Events in Lviv',
      },
      {
        imageUrl: 'http://www.dniprohotel.ua/assets/photo/dnipro-hotel/dnipro-hotel-kiev-02.jpg',
        date: '2017-07-19',
        id: 'hsdse3ee',
        title: 'Events in Dnipro',
      },
    ],
    user: {
      id: 'defwfew',
      registerEvents: ['dw3de3ee'],
    },
  },
  mutations: {},
  actions: {},
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
  },
});

export default store;
