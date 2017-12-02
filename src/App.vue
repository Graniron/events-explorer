<template>
  <v-app light>
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile flat v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon> 
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Event Explorer</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn :to="item.link" v-for="item in menuItems" :key="item.title" flat>
          <v-icon dark left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon dark left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>  
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
      };
    },
    computed: {
      menuItems() {
        let menuItems = [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' },
        ];
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'View Events', link: '/events' },
            { icon: 'room', title: 'Organize Event', link: '/events/new' },
            { icon: 'person', title: 'Profile', link: '/profile' },
          ];
        }
        return menuItems;
      },
      userIsAuthenticated() {
        return this.$store.getters.user;
      },
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      },
    },
  };

</script>

<style>
  @import './css/main.css';
</style>
