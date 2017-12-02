import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Events from '@/components/event/Events';
import CreateEvent from '@/components/event/CreateEvent';
import Profile from '@/components/user/Profile';
import Signup from '@/components/user/Signup';
import Signin from '@/components/user/Signin';
import Event from '@/components/event/Event';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home,
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
    },
    {
      path: '/events/new',
      name: 'CreateEvent',
      component: CreateEvent,
      beforeEnter: AuthGuard,
    },
    {
      path: '/events/:id',
      props: true,
      name: 'Event',
      component: Event,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
  ],
  mode: 'history',
});
